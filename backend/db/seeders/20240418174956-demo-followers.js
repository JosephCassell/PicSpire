'use strict';
const { Follower } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Follower.bulkCreate([
      // JohnDoe123 follows JaneSmith89, MikeTheTraveler, EmilyArt and RachelMPhotography
      { user_follower_id: 1, followed_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 1, followed_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 1, followed_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 1, followed_id: 5, createdAt: new Date(), updatedAt: new Date() },
      
      // JaneSmith89 follows JohnDoe123 and EmilyArt
      { user_follower_id: 2, followed_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 2, followed_id: 4, createdAt: new Date(), updatedAt: new Date() },
      
      // MikeTheTraveler follows JaneSmith89 and GreenThumbLisa
      { user_follower_id: 3, followed_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 3, followed_id: 6, createdAt: new Date(), updatedAt: new Date() },

      // EmilyArt follows DanTheMan and RachelMPhotography
      { user_follower_id: 4, followed_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 4, followed_id: 12, createdAt: new Date(), updatedAt: new Date() },

      // DanTheMan follows MikeFitness and SamTheChef
      { user_follower_id: 5, followed_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 5, followed_id: 13, createdAt: new Date(), updatedAt: new Date() },

      // GreenThumbLisa follows JohnDoe123 and OliviaReads
      { user_follower_id: 6, followed_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 6, followed_id: 14, createdAt: new Date(), updatedAt: new Date() },

      // MikeFitness follows DanTheMan and ChrisEvans23
      { user_follower_id: 7, followed_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 7, followed_id: 9, createdAt: new Date(), updatedAt: new Date() },

      // SarahWrites follows BakingWithLinda and OliviaReads
      { user_follower_id: 8, followed_id: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 8, followed_id: 14, createdAt: new Date(), updatedAt: new Date() },

      // ChrisEvans23 follows RachelMPhotography and AJTechGuru
      { user_follower_id: 9, followed_id: 12, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 9, followed_id: 11, createdAt: new Date(), updatedAt: new Date() },

      // BakingWithLinda follows GreenThumbLisa and MikeTheTraveler
      { user_follower_id: 10, followed_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 10, followed_id: 3, createdAt: new Date(), updatedAt: new Date() },

      // AJTechGuru follows DavidH and JohnDoe123
      { user_follower_id: 11, followed_id: 15, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 11, followed_id: 1, createdAt: new Date(), updatedAt: new Date() },

      // RachelMPhotography follows MikeFitness and EmilyArt
      { user_follower_id: 12, followed_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 12, followed_id: 4, createdAt: new Date(), updatedAt: new Date() },

      // SamTheChef follows GreenThumbLisa and SarahWrites
      { user_follower_id: 13, followed_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 13, followed_id: 8, createdAt: new Date(), updatedAt: new Date() },

      // OliviaReads follows JaneSmith89 and DanTheMan
      { user_follower_id: 14, followed_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 14, followed_id: 5, createdAt: new Date(), updatedAt: new Date() },

      // DavidH follows AJTechGuru and MikeTheTraveler
      { user_follower_id: 15, followed_id: 11, createdAt: new Date(), updatedAt: new Date() },
      { user_follower_id: 15, followed_id: 3, createdAt: new Date(), updatedAt: new Date() }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Followers';
    await queryInterface.bulkDelete(options);
  }
};
