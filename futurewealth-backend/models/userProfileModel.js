const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserProfile = sequelize.define('UserProfile', {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  income: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  savings: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pensionRights: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  homeValue: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mortgage: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = UserProfile;
