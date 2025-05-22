const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")
const Transfer = sequelize.define("Transfer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numberOperation: {
     type: DataTypes.INTEGER,
    allowNull: false,
  },
  salesman: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  originBank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationBank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiptImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "review", "approved ", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
});


module.exports = Transfer;
