const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const SimulationHistory = sequelize.define('SimulationHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: DataTypes.INTEGER,
  income: DataTypes.FLOAT,
  savings: DataTypes.FLOAT,
  pensionRights: DataTypes.FLOAT,
  homeValue: DataTypes.FLOAT,
  mortgage: DataTypes.FLOAT,
  targetRetirementAge: DataTypes.INTEGER,
  yearsToRetirement: DataTypes.INTEGER,
  estimatedSavingsAtRetirement: DataTypes.FLOAT,
  estimatedTaxesPerYear: DataTypes.FLOAT,
  successProbability: DataTypes.FLOAT,
  aiRecommendation: DataTypes.TEXT
}, {
  timestamps: true
});

module.exports = SimulationHistory;
