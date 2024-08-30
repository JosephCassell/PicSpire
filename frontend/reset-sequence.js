const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function resetSequence() {
  try {
    await sequelize.query(`
      SELECT setval('picspire_schema."Images_id_seq"', (SELECT MAX(id) FROM picspire_schema."Images") + 1);
    `);
    console.log('Sequence reset successfully');
  } catch (error) {
    console.error('Error resetting sequence:', error);
  } finally {
    await sequelize.close();
  }
}

resetSequence();
