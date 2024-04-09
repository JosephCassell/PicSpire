'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reaction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Reaction.belongsTo(models.Post, {
        foreignKey: 'reactionable_id',
        constraints: false,
        scope: {
          reactionable_type: 'post'
        },
        as: 'post'
      });
      Reaction.belongsTo(models.Comment, {
        foreignKey: 'reactionable_id',
        constraints: false,
        scope: {
          reactionable_type: 'comment'
        },
        as: 'comment'
      });
    }
  }
  Reaction.init({
    reactionable_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reactionable_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};
