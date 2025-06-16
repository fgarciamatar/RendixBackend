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
  dateTransfer: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
   dateOfLoading: {
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
  status: {
    type: DataTypes.ENUM("pending", "review", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
  cashboxId: {
    type: DataTypes.INTEGER,
    references: {
      model: "CashBoxes",
      key: "id",
    }
  },
});


module.exports = Transfer;
