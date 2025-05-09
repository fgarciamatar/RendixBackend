const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const CashDetail = sequelize.define("CashDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cashboxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ten: DataTypes.INTEGER,
  twenty: DataTypes.INTEGER,
  fifty: DataTypes.INTEGER,
  hundred: DataTypes.INTEGER,
  twoHundred: DataTypes.INTEGER,
  fiveHundred: DataTypes.INTEGER,
  thousand: DataTypes.INTEGER,
  twoThousand: DataTypes.INTEGER,
  tenThousand: DataTypes.INTEGER,
  twentyThousand: DataTypes.INTEGER,
  totalCash: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

module.exports = CashDetail;
