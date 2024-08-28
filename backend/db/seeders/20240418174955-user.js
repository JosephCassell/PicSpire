'use strict';

const bcrypt = require("bcryptjs");
const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        email: 'john.doe@example.com',
        username: 'JohnDoe123',
        hashedPassword: bcrypt.hashSync('securePass1'),
        firstName: "John",
        lastName: "Doe",
        bio: "Web developer and coffee enthusiast. Love to explore new technologies.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867697444.jpg'
      },
      {
        email: 'jane.smith@example.com',
        username: 'JaneSmith89',
        hashedPassword: bcrypt.hashSync('securePass2'),
        firstName: "Jane",
        lastName: "Smith",
        bio: "Marketing expert with a passion for social media and content creation.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867698134.jpeg'
      },
      {
        email: 'mike.jones@example.com',
        username: 'MikeTheTraveler',
        hashedPassword: bcrypt.hashSync('securePass3'),
        firstName: "Mike",
        lastName: "Jones",
        bio: "Travel blogger documenting my adventures around the world.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867698731.jpg'
      },
      {
        email: 'emily.white@example.com',
        username: 'EmilyArt',
        hashedPassword: bcrypt.hashSync('securePass4'),
        firstName: "Emily",
        lastName: "White",
        bio: "Artist and designer. Creating visual stories through paint and pixels.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867698953.jpg'
      },
      {
        email: 'dan.brown@example.com',
        username: 'DanTheMan',
        hashedPassword: bcrypt.hashSync('securePass5'),
        firstName: "Dan",
        lastName: "Brown",
        bio: "Tech geek, gamer, and part-time coder. Always learning something new.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867699276.jpg'
      },
      {
        email: 'lisa.green@example.com',
        username: 'GreenThumbLisa',
        hashedPassword: bcrypt.hashSync('securePass6'),
        firstName: "Lisa",
        lastName: "Green",
        bio: "Gardening enthusiast sharing tips on growing your own food.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867700126.jpg'
      },
      {
        email: 'michael.lee@example.com',
        username: 'MikeFitness',
        hashedPassword: bcrypt.hashSync('securePass7'),
        firstName: "Michael",
        lastName: "Lee",
        bio: "Personal trainer helping others achieve their fitness goals.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867700453.jpg'
      },
      {
        email: 'sarah.connor@example.com',
        username: 'SarahWrites',
        hashedPassword: bcrypt.hashSync('securePass8'),
        firstName: "Sarah",
        lastName: "Connor",
        bio: "Frelance writer and storyteller. Writing about life, love, and everything in between.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867700850.jpeg'
      },
      {
        email: 'chris.evans@example.com',
        username: 'ChrisEvans23',
        hashedPassword: bcrypt.hashSync('securePass9'),
        firstName: "Chris",
        lastName: "Evans",
        bio: "Aspiring actor with a love for classic cinema and theater.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867701080.jpg'
      },
      {
        email: 'linda.baker@example.com',
        username: 'BakingWithLinda',
        hashedPassword: bcrypt.hashSync('securePass10'),
        firstName: "Linda",
        lastName: "Baker",
        bio: "Home baker sharing my favorite recipes and baking tips.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867701628.jpg'
      },
      {
        email: 'alex.johnson@example.com',
        username: 'AJTechGuru',
        hashedPassword: bcrypt.hashSync('securePass11'),
        firstName: "Alex",
        lastName: "Johnson",
        bio: "Tech blogger reviewing the latest gadgets and software.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867701845.jpeg'
      },
      {
        email: 'rachel.martin@example.com',
        username: 'RachelMPhotography',
        hashedPassword: bcrypt.hashSync('securePass12'),
        firstName: "Rachel",
        lastName: "Martin",
        bio: "Photographer capturing moments one click at a time.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867702015.jpg'
      },
      {
        email: 'samuel.king@example.com',
        username: 'SamTheChef',
        hashedPassword: bcrypt.hashSync('securePass13'),
        firstName: "Samuel",
        lastName: "King",
        bio: "Chef and food lover. Sharing my culinary adventures.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867702349.png'
      },
      {
        email: 'olivia.james@example.com',
        username: 'OliviaReads',
        hashedPassword: bcrypt.hashSync('securePass14'),
        firstName: "Olivia",
        lastName: "James",
        bio: "Bookworm and aspiring author. Diving into the world of fiction.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867703739.jpeg'
      },
      {
        email: 'david.harris@example.com',
        username: 'DavidH',
        hashedPassword: bcrypt.hashSync('securePass15'),
        firstName: "David",
        lastName: "Harris",
        bio: "Entrepreneur with a passion for startups and innovation.",
        profilePicture: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724867703911.jpeg'
      }
    ];

    
    await User.bulkCreate(users, { validate: true });
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
