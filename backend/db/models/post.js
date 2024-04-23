'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });
    }
  }
  Post.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    caption: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
