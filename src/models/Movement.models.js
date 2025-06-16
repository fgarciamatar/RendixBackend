const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

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
    type: DataTypes.ENUM("income", "expense"), // ingreso o egreso
    allowNull: false,
  },
  conceptType: {
    type: DataTypes.STRING, // ej: "transferencia", "venta", "detalleEfectivo"
    allowNull: false,
  },
  esDetalleEfectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Por defecto no es un detalle de efectivo
  },
  cashboxId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "CashBoxes",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  
});

module.exports = Movement;
