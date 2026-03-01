const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync models (creates tables if not exist)
    // In production, use migrations instead of sync
    if (process.env.NODE_ENV !== 'production') {
      await db.sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔑 Login: POST http://localhost:${PORT}/api/auth/login`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

start();
