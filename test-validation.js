const { Pengurus } = require('./models');
const db = require('./models');

async function test() {
  await db.sequelize.authenticate();
  try {
    await Pengurus.create({
      name: 'Test',
      role: 'Test',
      bio: '',
      image: '',
      type: 'Dewan Nasional'
    });
    console.log('Success');
  } catch (err) {
    console.error('Validation error:', err.errors ? err.errors.map(e => e.message) : err.message);
  }
  process.exit();
}
test();
