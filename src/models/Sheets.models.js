const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const Sheet = sequelize.define("Sheet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cajaMananaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "CashBoxes",
      key: "id",
    },
  },
  cajaTardeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "CashBoxes",
      key: "id",
    },
  },
  totalSheet: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  totalSistema: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
});

// Hook que se ejecuta antes de guardar (crear o actualizar)
Sheet.beforeSave(async (sheet, options) => {
  const { CashBox } = require("./index");

  let totalCash = 0;
  let totalSys = 0;

  if (sheet.cajaMananaId) {
    const cajaManana = await CashBox.findByPk(sheet.cajaMananaId);
    totalCash += parseFloat(cajaManana?.totalCash || 0);
    totalSys += parseFloat(cajaManana?.totalSystem || 0);
  }

  if (sheet.cajaTardeId) {
    const cajaTarde = await CashBox.findByPk(sheet.cajaTardeId);
    totalCash += parseFloat(cajaTarde?.totalCash || 0);
    totalSys += parseFloat(cajaTarde?.totalSystem || 0);
  }

  sheet.totalSheet = totalCash;
  sheet.totalSistema = totalSys;
});

module.exports = Sheet;
