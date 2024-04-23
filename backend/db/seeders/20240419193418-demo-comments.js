'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [{
      post_id: 1,
      parent_comment_id: null,
      user_id: 1,
      text: 'This is a great post!',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      post_id: 1,
      parent_comment_id: null, 
      user_id: 2,
      text: 'Absolutely love this!',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      post_id: 2,
      parent_comment_id: null, 
      user_id: 3,
      text: 'Really insightful, thanks for sharing.',
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
      post_id: 2,
      parent_comment_id: 3,
      user_id: 2,
      text: 'This is an interesting perspective!',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      post_id: 3,
      parent_comment_id: null,
      user_id: 6,
      text: 'Could you elaborate on this point?',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      post_id: 3,
      parent_comment_id: null,
      user_id: 7,
      text: 'I never thought about it this way!',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      post_id: 1,
      parent_comment_id: 2,
      user_id: 8,
      text: 'Thanks for this insight!',
      image_url: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
