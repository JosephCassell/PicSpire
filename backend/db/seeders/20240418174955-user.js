'use strict';

const bcrypt = require("bcryptjs");
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'john.doe@example.com',
        username: 'JohnDoe123',
        hashedPassword: bcrypt.hashSync('securePass1'),
        firstName: "John",
        lastName: "Doe",
        bio: "Web developer and coffee enthusiast. Love to explore new technologies.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'jane.smith@example.com',
        username: 'JaneSmith89',
        hashedPassword: bcrypt.hashSync('securePass2'),
        firstName: "Jane",
        lastName: "Smith",
        bio: "Marketing expert with a passion for social media and content creation.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'mike.jones@example.com',
        username: 'MikeTheTraveler',
        hashedPassword: bcrypt.hashSync('securePass3'),
        firstName: "Mike",
        lastName: "Jones",
        bio: "Travel blogger documenting my adventures around the world.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'emily.white@example.com',
        username: 'EmilyArt',
        hashedPassword: bcrypt.hashSync('securePass4'),
        firstName: "Emily",
        lastName: "White",
        bio: "Artist and designer. Creating visual stories through paint and pixels.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'dan.brown@example.com',
        username: 'DanTheMan',
        hashedPassword: bcrypt.hashSync('securePass5'),
        firstName: "Dan",
        lastName: "Brown",
        bio: "Tech geek, gamer, and part-time coder. Always learning something new.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'lisa.green@example.com',
        username: 'GreenThumbLisa',
        hashedPassword: bcrypt.hashSync('securePass6'),
        firstName: "Lisa",
        lastName: "Green",
        bio: "Gardening enthusiast sharing tips on growing your own food.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'michael.lee@example.com',
        username: 'MikeFitness',
        hashedPassword: bcrypt.hashSync('securePass7'),
        firstName: "Michael",
        lastName: "Lee",
        bio: "Personal trainer helping others achieve their fitness goals.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'sarah.connor@example.com',
        username: 'SarahWrites',
        hashedPassword: bcrypt.hashSync('securePass8'),
        firstName: "Sarah",
        lastName: "Connor",
        bio: "Freelance writer and storyteller. Writing about life, love, and everything in between.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'chris.evans@example.com',
        username: 'ChrisEvans23',
        hashedPassword: bcrypt.hashSync('securePass9'),
        firstName: "Chris",
        lastName: "Evans",
        bio: "Aspiring actor with a love for classic cinema and theater.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'linda.baker@example.com',
        username: 'BakingWithLinda',
        hashedPassword: bcrypt.hashSync('securePass10'),
        firstName: "Linda",
        lastName: "Baker",
        bio: "Home baker sharing my favorite recipes and baking tips.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'alex.johnson@example.com',
        username: 'AJTechGuru',
        hashedPassword: bcrypt.hashSync('securePass11'),
        firstName: "Alex",
        lastName: "Johnson",
        bio: "Tech blogger reviewing the latest gadgets and software.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'rachel.martin@example.com',
        username: 'RachelMPhotography',
        hashedPassword: bcrypt.hashSync('securePass12'),
        firstName: "Rachel",
        lastName: "Martin",
        bio: "Photographer capturing moments one click at a time.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'samuel.king@example.com',
        username: 'SamTheChef',
        hashedPassword: bcrypt.hashSync('securePass13'),
        firstName: "Samuel",
        lastName: "King",
        bio: "Chef and food lover. Sharing my culinary adventures.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'olivia.james@example.com',
        username: 'OliviaReads',
        hashedPassword: bcrypt.hashSync('securePass14'),
        firstName: "Olivia",
        lastName: "James",
        bio: "Bookworm and aspiring author. Diving into the world of fiction.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'david.harris@example.com',
        username: 'DavidH',
        hashedPassword: bcrypt.hashSync('securePass15'),
        firstName: "David",
        lastName: "Harris",
        bio: "Entrepreneur with a passion for startups and innovation.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [
        'JohnDoe123', 'JaneSmith89', 'MikeTheTraveler', 'EmilyArt', 'DanTheMan', 
        'GreenThumbLisa', 'MikeFitness', 'SarahWrites', 'ChrisEvans23', 
        'BakingWithLinda', 'AJTechGuru', 'RachelMPhotography', 'SamTheChef', 
        'OliviaReads', 'DavidH'
      ] }
    }, {});
  }
};
