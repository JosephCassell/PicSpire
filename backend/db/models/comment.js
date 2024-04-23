'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Comment.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
      Comment.belongsTo(models.Comment, { foreignKey: 'parent_comment_id', as: 'parentComment' });
      Comment.hasMany(models.Comment, { foreignKey: 'parent_comment_id', as: 'childComments' });
    }
  }
  Comment.init({
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Comments',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
