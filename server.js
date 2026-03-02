require('dotenv').config();

const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5050;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection established.');

    if (process.env.NODE_ENV !== 'production') {
      await db.sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
    }

    app.listen(PORT, '127.0.0.1', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

start();