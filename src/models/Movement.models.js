const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const Movement = sequelize.define("Movement", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  concept: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  movementType: {
    type: DataTypes.ENUM("income", "expense"),
    allowNull: false,
  },
  conceptType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cashboxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Movement;
