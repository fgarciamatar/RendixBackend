const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const CashBox = sequelize.define("CashBox", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  morningCashId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eveningCashId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalCash: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  totalSystem: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CashBox;

