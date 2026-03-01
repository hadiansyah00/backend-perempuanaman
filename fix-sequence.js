const db = require('./models');

async function fixSequence() {
  await db.sequelize.authenticate();
  try {
    const dialect = db.sequelize.options.dialect;
    if (dialect === 'postgres') {
      await db.sequelize.query(`SELECT setval('pengurus_id_seq', COALESCE((SELECT MAX(id)+1 FROM pengurus), 1), false);`);
      console.log('Postgres sequence reset successfully for pengurus');
    } else {
      console.log('Not postgres, no sequence reset needed or implement mysql equivalent');
    }
  } catch (err) {
    console.error('Sequence fix error:', err.message);
  }
  process.exit();
}
fixSequence();
