'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
const { Post } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkCreate( 'Posts',[
      {
        user_id: 1,
        caption: 'First post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        caption: 'Second post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        caption: 'Third post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        caption: 'Fourth post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        caption: 'Fifth post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        caption: 'Sixth post!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        caption: 'First post for User 2!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        caption: 'Second post for User 2!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        caption: 'Third post for User 2!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        caption: 'Only post for User 3!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
