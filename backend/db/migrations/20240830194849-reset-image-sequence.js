'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      await queryInterface.sequelize.query(`
        SELECT setval('picspire_schema."Images_id_seq"', (SELECT MAX(id) FROM picspire_schema."Images") + 1);
      `);
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
