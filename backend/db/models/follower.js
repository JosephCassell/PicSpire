'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate(models) {
      Follower.belongsTo(models.User, { foreignKey: 'user_follower_id', as: 'user_followers' });
      Follower.belongsTo(models.User, { foreignKey: 'followed_id', as: 'followed' });
    }
  }
  Follower.init({
    user_follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    followed_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};
