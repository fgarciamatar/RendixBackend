const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const CashBox = sequelize.define("CashBox", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  shift: {
    type: DataTypes.ENUM("morning", "afternoon"),
    allowNull: false,
  },
  totalCash: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  sale: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
});

module.exports = CashBox;
