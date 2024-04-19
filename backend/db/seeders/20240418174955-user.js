'use strict';

const bcrypt = require("bcryptjs");
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Demo",
        lastName: "User",
        bio: "I am the demo user.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Fake",
        lastName: "Person",
        bio: "I am a fake user.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Another",
        lastName: "Human",
        bio: "I am another fake user.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@user.io',
        username: 'UserThree',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: "User",
        lastName: "Three",
        bio: "Just another user.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user4@user.io',
        username: 'UserFour',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: "User",
        lastName: "Four",
        bio: "Exploring the world of users.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user5@user.io',
        username: 'UserFive',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: "User",
        lastName: "Five",
        bio: "I love coding.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user6@user.io',
        username: 'UserSix',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: "User",
        lastName: "Six",
        bio: "Sixth user in the system.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user7@user.io',
        username: 'UserSeven',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: "User",
        lastName: "Seven",
        bio: "Lucky number seven.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user8@user.io',
        username: 'UserEight',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: "User",
        lastName: "Eight",
        bio: "Great at eight.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user9@user.io',
        username: 'UserNine',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: "User",
        lastName: "Nine",
        bio: "Nine out of ten.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'UserThree', 'UserFour',
      'UserFive', 'UserSix', 'UserSeven', 'UserEight', 'UserNine'] }
    }, {});
  }
};