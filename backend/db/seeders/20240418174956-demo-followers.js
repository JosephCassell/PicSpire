
'use strict';
const {Follower} = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await Follower.bulkCreate([
      { user_follower_id: 1, followed_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 1, followed_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 2, followed_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 2, followed_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 3, followed_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 4, followed_id: 1, createdAt: new Date(), updatedAt: new Date() },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Followers';
    await queryInterface.bulkDelete(options);
  }
};