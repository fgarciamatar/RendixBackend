const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const CashDetail = sequelize.define("CashDetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cashboxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "CashBoxes", // Asegurate de que el nombre de la tabla CashBoxes esté correcto
      key: "id",
    },
    onDelete: "CASCADE", // Si se elimina la caja, se eliminan sus detalles
  },
  ten: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  twenty: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fifty: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hundred: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  twoHundred: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fiveHundred: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  thousand: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  twoThousand: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tenThousand: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  twentyThousand: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalCash: {
    type: DataTypes.VIRTUAL,
    get() {
      return (
        (this.getDataValue("ten") || 0) * 10 +
        (this.getDataValue("twenty") || 0) * 20 +
        (this.getDataValue("fifty") || 0) * 50 +
        (this.getDataValue("hundred") || 0) * 100 +
        (this.getDataValue("twoHundred") || 0) * 200 +
        (this.getDataValue("fiveHundred") || 0) * 500 +
        (this.getDataValue("thousand") || 0) * 1000 +
        (this.getDataValue("twoThousand") || 0) * 2000 +
        (this.getDataValue("tenThousand") || 0) * 10000 +
        (this.getDataValue("twentyThousand") || 0) * 20000
      );
    },
  },
});

module.exports = CashDetail;
