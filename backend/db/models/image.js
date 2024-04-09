'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Post, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'post'
        },
        as: 'post'
      });
      Image.belongsTo(models.Comment, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'comment'
        },
        as: 'comment'
      });
    }
  }
  Image.init({
    imageable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageable_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
