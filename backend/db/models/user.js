'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
      User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
      User.hasMany(models.Reaction, { foreignKey: 'user_id', as: 'reactions' });
      User.belongsToMany(User, {through: models.Follower, as: 'followers', foreignKey: 'followed_id', otherKey: 'user_follower_id'});
      User.belongsToMany(User, {through: models.Follower, as: 'following', foreignKey: 'user_follower_id', otherKey: 'followed_id'});      
      User.hasMany(models.Message, { foreignKey: 'sender_id', as: 'sentMessages' });
      User.hasMany(models.Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bio: {
        type: DataTypes.STRING
      },
      profilePicture: {
        type: DataTypes.STRING
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
