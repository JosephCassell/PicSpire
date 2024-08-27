'use strict';
const { Comment } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate([
      // Comments on JohnDoe123's first post
      {
        post_id: 1,
        parent_comment_id: null,
        user_id: 2,
        text: 'This is a great post!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        parent_comment_id: null,
        user_id: 3,
        text: 'Absolutely love this!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        parent_comment_id: 1,
        user_id: 4,
        text: 'I totally agree with you!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        parent_comment_id: 2,
        user_id: 5,
        text: 'Thanks for sharing this!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 1,
        parent_comment_id: 3,
        user_id: 6,
        text: 'Couldn’t agree more!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Comments on JaneSmith89's first post
      {
        post_id: 7,
        parent_comment_id: null,
        user_id: 1,
        text: 'Really insightful, thanks for sharing.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 7,
        parent_comment_id: 6,
        user_id: 2,
        text: 'This is an interesting perspective!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 7,
        parent_comment_id: 6,
        user_id: 3,
        text: 'I learned something new today!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 7,
        parent_comment_id: 8,
        user_id: 4,
        text: 'Glad you found it helpful!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 7,
        parent_comment_id: null,
        user_id: 5,
        text: 'Can you share more on this topic?',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Comments on MikeTheTraveler's third post
      {
        post_id: 13,
        parent_comment_id: null,
        user_id: 4,
        text: 'Could you elaborate on this point?',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 13,
        parent_comment_id: 11,
        user_id: 6,
        text: 'I’d love to hear more about this.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 13,
        parent_comment_id: null,
        user_id: 7,
        text: 'I never thought about it this way!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 13,
        parent_comment_id: 13,
        user_id: 8,
        text: 'This has really opened my eyes.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 13,
        parent_comment_id: 12,
        user_id: 1,
        text: 'Same here, very enlightening.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Comments on EmilyArt's second post
      {
        post_id: 17,
        parent_comment_id: null,
        user_id: 9,
        text: 'Amazing artwork, really inspiring!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 17,
        parent_comment_id: 16,
        user_id: 10,
        text: 'Your creativity is boundless!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 17,
        parent_comment_id: null,
        user_id: 12,
        text: 'This piece really speaks to me.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 17,
        parent_comment_id: 18,
        user_id: 13,
        text: 'I totally feel the same way!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 17,
        parent_comment_id: 19,
        user_id: 14,
        text: 'Art is such a powerful medium.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Comments on DanTheMan's first post
      {
        post_id: 21,
        parent_comment_id: null,
        user_id: 11,
        text: 'That setup looks awesome! 🎮',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 21,
        parent_comment_id: 21,
        user_id: 15,
        text: 'I wish I had a gaming rig like that!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 21,
        parent_comment_id: null,
        user_id: 1,
        text: 'Great choice of components!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 21,
        parent_comment_id: 23,
        user_id: 3,
        text: 'Thanks, I did a lot of research.',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        post_id: 21,
        parent_comment_id: 22,
        user_id: 4,
        text: 'That’s some serious gaming power!',
        image_url: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    await queryInterface.bulkDelete(options);
  }
};
