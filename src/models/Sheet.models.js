const { DataTypes } = require("sequelize");
const { sequelize } = require("./database");

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
   companyId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: "Companies", // Debe coincidir con el nombre de la tabla, no del archivo
    key: "id",
  },}
});

// // Hook que se ejecuta antes de guardar (crear o actualizar)
// Sheet.beforeSave(async (sheet, options) => {
//   const { CashBox } = require("./index");

//   let totalCash = 0;
//   let totalSys = 0;

//   if (sheet.cajaMananaId) {
//     const cajaManana = await CashBox.findByPk(sheet.cajaMananaId);
//     totalCash += parseFloat(cajaManana?.totalCash || 0);
//     totalSys += parseFloat(cajaManana?.totalSystem || 0);
//   }

//   if (sheet.cajaTardeId) {
//     const cajaTarde = await CashBox.findByPk(sheet.cajaTardeId);
//     totalCash += parseFloat(cajaTarde?.totalCash || 0);
//     totalSys += parseFloat(cajaTarde?.totalSystem || 0);
//   }

//   sheet.totalSheet = totalCash;
//   sheet.totalSistema = totalSys;
// });

module.exports = Sheet;
