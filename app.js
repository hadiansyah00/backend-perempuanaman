require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
const { publicCache, noCache } = require('./middleware/cache');

const app = express();

/* =====================================================
   SECURITY
===================================================== */
app.use(helmet());

/* =====================================================
   COMPRESSION (gzip/brotli)
===================================================== */
app.use(compression({
  level: 6,
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't accept it
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

/* =====================================================
   CORS CONFIG (MULTI ORIGIN SUPPORT)
===================================================== */
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));

// Handle preflight explicitly
app.options('/*path', cors(corsOptions));

/* =====================================================
   RATE LIMITING
===================================================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 500 : 2000,
  message: { error: 'Terlalu banyak request. Coba lagi nanti.' },
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' },
});

/* =====================================================
   LOGGING
===================================================== */
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
);

/* =====================================================
   BODY PARSER
===================================================== */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =====================================================
   STATIC FILES (UPLOADS)
===================================================== */
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    // Cache uploaded media for 1 day
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

/* =====================================================
   API DOCUMENTATION
===================================================== */
const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');

let swaggerDocument = {};
try {
  swaggerDocument = require('./swagger_output.json');
} catch (err) {
  console.warn('⚠️ swagger_output.json not found.');
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/swagger.json', (req, res) => res.json(swaggerDocument));

app.get('/redoc', redoc({
  title: 'Perempuan AMAN API',
  specUrl: '/swagger.json',
}));

/* =====================================================
   ROUTES — PRIVATE (no-cache)
   Auth, dashboard, users, analytics stats
===================================================== */
app.use('/api/auth', authLimiter, noCache, require('./routes/auth'));
app.use('/api/users', noCache, require('./routes/users'));
app.use('/api/dashboard', noCache, require('./routes/dashboard'));
app.use('/api/upload', noCache, require('./routes/upload'));

/* =====================================================
   ROUTES — PUBLIC (cacheable)
   Content endpoints that serve the public website
===================================================== */
app.use('/api/heroes', publicCache(120), require('./routes/heroes'));
app.use('/api/berita', publicCache(60, 120), require('./routes/berita'));
app.use('/api/taxonomy', publicCache(120), require('./routes/taxonomy'));
app.use('/api/wilayah', publicCache(120), require('./routes/wilayah'));
app.use('/api/capaian', publicCache(300), require('./routes/capaian'));
app.use('/api/audit', publicCache(300), require('./routes/audit'));
app.use('/api/pustaka', publicCache(120), require('./routes/pustaka'));
app.use('/api/suara-perempuan', publicCache(120), require('./routes/suaraprm'));
app.use('/api/pengurus', publicCache(300), require('./routes/pengurus'));
app.use('/api/mitra', publicCache(300), require('./routes/mitra'));
app.use('/api/gallery', publicCache(120), require('./routes/gallery'));
app.use('/api/settings', publicCache(300), require('./routes/settings'));
app.use('/api/analytics', require('./routes/analytics'));
/* =====================================================
   HEALTH CHECK
===================================================== */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/* =====================================================
   404 HANDLER
===================================================== */
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'Ukuran file terlalu besar. Maksimal 10MB.'
    });
  }

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message,
  });
});

module.exports = app;