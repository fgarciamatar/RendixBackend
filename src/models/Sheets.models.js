const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const Sheet = sequelize.define('Sheet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shift: {
    type: DataTypes.ENUM('morning', 'afternoon'),
    allowNull: false
  },
  totalCash: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = Sheet;
