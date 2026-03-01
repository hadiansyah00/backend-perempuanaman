require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// ─── Security ───
app.use(helmet());

// ─── CORS ───
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// ─── Rate Limiting ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Terlalu banyak request. Coba lagi nanti.' },
});
app.use('/api/', limiter);

// Auth-specific stricter rate limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' },
});

// ─── Logging ───
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Body Parsing ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Static Files (uploads) ───
// Override helmet's Cross-Origin-Resource-Policy for uploads so frontend (different port) can embed them
app.use('/uploads', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// ─── Swagger & ReDoc Documentation ───
const swaggerUi = require('swagger-ui-express');
const redoc = require('redoc-express');

let swaggerDocument = {};
try {
  swaggerDocument = require('./swagger_output.json');
} catch (err) {
  console.warn('⚠️ swagger_output.json not found. Run "npm run swagger" to generate it.');
}

// 1. Swagger UI at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2. ReDoc at /redoc
app.get('/swagger.json', (req, res) => res.json(swaggerDocument));
app.get('/redoc', redoc({
  title: 'Perempuan AMAN API',
  specUrl: '/swagger.json',
  redocOptions: { theme: { colors: { primary: { main: '#965596' } } } } // Matching the #965596 brand color
}));

// ─── Routes ───
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/heroes', require('./routes/heroes'));
app.use('/api/berita', require('./routes/berita'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wilayah', require('./routes/wilayah'));
app.use('/api/capaian', require('./routes/capaian'));
app.use('/api/audit', require('./routes/audit'));
app.use('/api/pustaka', require('./routes/pustaka'));
app.use('/api/suara-perempuan', require('./routes/suaraprm'));
app.use('/api/pengurus', require('./routes/pengurus'));
app.use('/api/mitra', require('./routes/mitra'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/settings', require('./routes/settings'));

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ───
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// ─── Error Handler ───
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Ukuran file terlalu besar. Maksimal 10MB.' });
  }
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
  });
});

module.exports = app;
