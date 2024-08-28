'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Image.bulkCreate([
      { id: 1, imageable_id: 1, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869145069.jpg%3F_i%3DAA' },
      { id: 2, imageable_id: 2, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869146302.jpg' },
      { id: 3, imageable_id: 3, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869147242.png' },
      { id: 4, imageable_id: 4, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869147535.rRYbQmCS4czb7YtGMoVtIwHaE8%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 5, imageable_id: 5, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869151530.jpg' },
      { id: 6, imageable_id: 6, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869151947.1n6Ltub3SqdcyhFYqrnOOgHaE8%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 7, imageable_id: 7, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869154048.png' },
      { id: 8, imageable_id: 8, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869154048.png' },
      { id: 9, imageable_id: 9, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869155699.png' },
      { id: 10, imageable_id: 10, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869160393.png%3Fitok%3DG9Biti8K' },
      { id: 11, imageable_id: 11, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869161191' },
      { id: 12, imageable_id: 12, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869161525.1q600oKZTKAVeQWXzfg7ywHaFI%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 13, imageable_id: 13, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869161875.jpg' },
      { id: 14, imageable_id: 14, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869162367.jpg' },
      { id: 15, imageable_id: 15, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869163439.jpg' },
      { id: 16, imageable_id: 16, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869164194.jpg%3F1682919097' },
      { id: 17, imageable_id: 17, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869164598.d1jhYhaWjLirKAklboBhIQHaE8%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 18, imageable_id: 18, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869165026.jpeg' },
      { id: 19, imageable_id: 19, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869165805.jpg' },
      { id: 20, imageable_id: 20, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869166199.jpg' },
      { id: 21, imageable_id: 21, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869166577.YsMlM_uqiPbO7IQ3u3u_KAHaJ4%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 22, imageable_id: 22, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869166851.wOsSI9FkFBSkGpFJ8hg4fAHaFj%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 23, imageable_id: 23, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869167103.jpg' },
      { id: 24, imageable_id: 24, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869167418._-v3YJjsgrML-Z_cojqJyAHaE8%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 25, imageable_id: 25, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869167710.jpg' },
      { id: 26, imageable_id: 26, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869168162.jpg' },
      { id: 27, imageable_id: 27, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869168624.jpg' },
      { id: 28, imageable_id: 28, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869169085.png' },
      { id: 29, imageable_id: 29, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869170701.jpg' },
      { id: 30, imageable_id: 30, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869171328.jpg' },
      { id: 31, imageable_id: 31, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869172472.jpg' },
      { id: 32, imageable_id: 32, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869173384.jpg' },
      { id: 33, imageable_id: 33, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869173810.jpg' },
      { id: 34, imageable_id: 34, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869174098.jpg' },
      { id: 35, imageable_id: 35, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869174418.pU6i5G1FXMVIeMD03AWjzAHaHH%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 36, imageable_id: 36, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869175558.jpg' },
      { id: 37, imageable_id: 37, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869175878.mGPSVDeNtlSW_YWaWBVPEwHaD4%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 38, imageable_id: 38, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869176356.jpg' },
      { id: 39, imageable_id: 39, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869176681.jpg' },
      { id: 40, imageable_id: 40, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869177104.jpg' },
      { id: 41, imageable_id: 41, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869180074.jpg' },
      { id: 42, imageable_id: 42, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869180561.jpg' },
      { id: 43, imageable_id: 43, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869181171.jpg' },
      { id: 44, imageable_id: 44, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869181577.jbFR_8D-Ax-VZlCkPiITyAHaEK%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 45, imageable_id: 45, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869181932.jpg' },
      { id: 46, imageable_id: 46, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869183310.jpg' },
      { id: 47, imageable_id: 47, imageable_type: 'post', image_url: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/3/2/4/0155043_Cake-56-touching-cake_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1371595433947.jpeg' },
      { id: 48, imageable_id: 48, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869183806.jpg' },
      { id: 49, imageable_id: 49, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869184272.jpg%3Fquality%3D82%26strip%3D1%26w%3D800' },
      { id: 50, imageable_id: 50, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869186867.jpg' },
      { id: 51, imageable_id: 51, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869187239.jpg' },
      { id: 52, imageable_id: 52, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869188073.jpg' },
      { id: 53, imageable_id: 53, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869188590.jpg%3Fresize%3D1536%252C864%26quality%3D50%26strip%3Dall' },
      { id: 54, imageable_id: 54, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869189115.jpg' },
      { id: 55, imageable_id: 55, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869190297.u5LTkO09BRLKaqqehTM3VwHaED%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 56, imageable_id: 56, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869190699.jpg%3Ffit%3D1500%252C1000%26ssl%3D1' },
      { id: 57, imageable_id: 57, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869191200.jpg' },
      { id: 58, imageable_id: 58, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869191634.jpg' },
      { id: 59, imageable_id: 59, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869192013.png' },
      { id: 60, imageable_id: 60, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869192511.aZYZYUCymAzMhvQkd8CZTgHaEK%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 61, imageable_id: 61, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869192783.jpg' },
      { id: 62, imageable_id: 62, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869193086.A6ukPyMSjDp8n9dwIGVVWgHaFj%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 63, imageable_id: 63, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869193482.jpg' },
      { id: 64, imageable_id: 64, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869194212.jpg' },
      { id: 65, imageable_id: 65, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869194851.jpg' },
      { id: 66, imageable_id: 66, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869195206.jpg' },
      { id: 67, imageable_id: 67, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869195707.0UzznVGz2miJwspPL18p5gHaEK%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 68, imageable_id: 68, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869196458.jpg' },
      { id: 69, imageable_id: 69, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869197702.d5IgnfCr04jiC7lPks5a1gAAAA%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 70, imageable_id: 70, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869197966.jOEEHXpNNWX66-K8q9-P4wHaLX%26pid%3DApi%26P%3D0%26h%3D220' },
      { id: 71, imageable_id: 71, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869198276' },
      { id: 72, imageable_id: 72, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869199221.png' },
      { id: 73, imageable_id: 73, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869199843.jpg' },
      { id: 74, imageable_id: 74, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869200214.jpg' },
      { id: 75, imageable_id: 75, imageable_type: 'post', image_url: 'https://appacademybuckets.s3.us-west-1.amazonaws.com/public/1724869201243.jpg' },
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    await queryInterface.bulkDelete(options);
  }
};
