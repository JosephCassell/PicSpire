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
    await Post.bulkCreate([
      // JohnDoe123's posts
      { user_id: 1, caption: 'Exploring new tech today! #webdev', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, caption: 'Coffee break while coding. ☕ #productive', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, caption: 'Just finished a new project, so excited!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, caption: 'Learning something new every day.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, caption: 'Ready for the weekend! 🎉', createdAt: new Date(), updatedAt: new Date() },

      // JaneSmith89's posts
      { user_id: 2, caption: 'Marketing is all about understanding your audience.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, caption: 'Creating content that resonates. 💡', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, caption: 'Analyzing trends for the next big campaign.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, caption: 'Sometimes, less is more.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, caption: 'Collaboration is key in the marketing world.', createdAt: new Date(), updatedAt: new Date() },

      // MikeTheTraveler's posts
      { user_id: 3, caption: 'First day in Tokyo, what a city! 🗼', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, caption: 'Exploring the temples of Kyoto.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, caption: 'Backpacking through Southeast Asia.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, caption: 'The beaches here are stunning! 🌴', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, caption: 'Next stop: Bali. Can’t wait!', createdAt: new Date(), updatedAt: new Date() },

      // EmilyArt's posts
      { user_id: 4, caption: 'Working on a new painting, inspired by nature. 🎨', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 4, caption: 'Experimenting with digital art today.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 4, caption: 'Art is a way to express what words can’t.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 4, caption: 'Finished a new piece, feeling accomplished.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 4, caption: 'Taking a break to gather more inspiration.', createdAt: new Date(), updatedAt: new Date() },

      // DanTheMan's posts
      { user_id: 5, caption: 'Just built a new gaming rig, it’s a beast! 🎮', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 5, caption: 'Coding by day, gaming by night.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 5, caption: 'Trying out a new game, let’s see how it goes.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 5, caption: 'Can’t wait for the weekend LAN party!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 5, caption: 'Just hit a new high score! 💯', createdAt: new Date(), updatedAt: new Date() },

      // GreenThumbLisa's posts
      { user_id: 6, caption: 'Planted some new herbs today. 🌱', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 6, caption: 'My garden is thriving, so rewarding!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 6, caption: 'Sharing tips on growing your own veggies.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 6, caption: 'There’s something peaceful about gardening.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 6, caption: 'Harvested my first tomatoes today. 🍅', createdAt: new Date(), updatedAt: new Date() },

      // MikeFitness' posts
      { user_id: 7, caption: 'Starting the day with a workout. 💪', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 7, caption: 'Fitness is a journey, not a destination.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 7, caption: 'Healthy body, healthy mind.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 7, caption: 'Pushing my limits every day.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 7, caption: 'Nutrition is just as important as exercise.', createdAt: new Date(), updatedAt: new Date() },

      // SarahWrites' posts
      { user_id: 8, caption: 'Writing is my way of making sense of the world.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 8, caption: 'Just finished a new short story, feeling inspired.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 8, caption: 'Words have the power to change lives.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 8, caption: 'Starting a new writing project today.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 8, caption: 'Reading fuels my creativity.', createdAt: new Date(), updatedAt: new Date() },

      // ChrisEvans23's posts
      { user_id: 9, caption: 'Auditioned for a new role today, fingers crossed!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 9, caption: 'Studying some classic films for inspiration.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 9, caption: 'Theater is where I feel most alive.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 9, caption: 'Acting is about becoming someone else for a while.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 9, caption: 'Just wrapped up a new project, can’t wait to share!', createdAt: new Date(), updatedAt: new Date() },

      // BakingWithLinda's posts
      { user_id: 10, caption: 'Baked some fresh bread today, smells amazing! 🍞', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 10, caption: 'Trying a new cake recipe, fingers crossed.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 10, caption: 'Baking is like therapy for me.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 10, caption: 'Sharing my secret cookie recipe today.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 10, caption: 'The joy of baking is in the process.', createdAt: new Date(), updatedAt: new Date() },

      // AJTechGuru's posts
      { user_id: 11, caption: 'Unboxing the latest gadget, stay tuned!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 11, caption: 'Tech is always evolving, and so should we.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 11, caption: 'Writing a review of the new smartphone.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 11, caption: 'Excited to test out this new software.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 11, caption: 'Tech can make life easier if used right.', createdAt: new Date(), updatedAt: new Date() },

      // RachelMPhotography's posts
      { user_id: 12, caption: 'Captured a beautiful sunset today. 🌅', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 12, caption: 'Photography is about seeing the world differently.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 12, caption: 'Just got a new lens, excited to try it out!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 12, caption: 'Editing photos from my latest shoot.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 12, caption: 'A picture is worth a thousand words.', createdAt: new Date(), updatedAt: new Date() },

      // SamTheChef's posts
      { user_id: 13, caption: 'Cooking up a storm in the kitchen today. 👨‍🍳', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 13, caption: 'Trying out a new recipe, hope it turns out great.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 13, caption: 'The secret to good food is fresh ingredients.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 13, caption: 'Sharing my favorite recipe with you all.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 13, caption: 'Cooking is an art, and I’m the artist.', createdAt: new Date(), updatedAt: new Date() },

      // OliviaReads' posts
      { user_id: 14, caption: 'Just finished reading a fantastic book!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 14, caption: 'Books are a window into other worlds.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 14, caption: 'Started writing my own novel today.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 14, caption: 'Reading before bed is my favorite routine.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 14, caption: 'Can’t wait to dive into my next book.', createdAt: new Date(), updatedAt: new Date() },

      // DavidH's posts
      { user_id: 15, caption: 'Entrepreneurship is about solving problems.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 15, caption: 'Working on a new startup idea.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 15, caption: 'Networking is key to business success.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 15, caption: 'Always learning and growing.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 15, caption: 'Success is a journey, not a destination.', createdAt: new Date(), updatedAt: new Date() }
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Posts';
    await queryInterface.bulkDelete(options);
  }
};
