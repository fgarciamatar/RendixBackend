const { sequelize } = require("../models/database.js");
const CashBox = require("./CashBox.models.js");
const CashDetail = require("./CashDetail.models.js");
const Company = require("./Company.models.js");
const Movement = require("./Movement.models.js");
const Sheet = require("./Sheet.models.js");
const SuperAdmin = require("./SuperAdmin.models.js");
const Transfer = require("./Transfer.models.js");
const User = require("./User.models.js");
const UserTransfer = require("./UserTransfer.models.js")
// SuperAdmin → Company
SuperAdmin.hasMany(Company, { foreignKey: "superAdminId" });
Company.belongsTo(SuperAdmin, { foreignKey: "superAdminId" });

// Company → User, Transfer, Sheet
Company.hasMany(User, { foreignKey: "companyId" });
User.belongsTo(Company, { foreignKey: "companyId" });


// Company -> Sheet
Company.hasMany(Sheet, { foreignKey: "companyId" });
Sheet.belongsTo(Company, { foreignKey: "companyId" });

// Sheet → CashBox (morning, afternoon)
Sheet.belongsTo(CashBox, { foreignKey: 'sheetId' });
Sheet.belongsTo(CashBox, {foreignKey: 'sheetId' });

// Una caja tiene muchos movimientos
CashBox.hasMany(Movement, { foreignKey: 'cashboxId' });
Movement.belongsTo(CashBox, { foreignKey: 'cashboxId' });

// Una caja tiene un detalle de billetes
CashBox.hasOne(CashDetail, { foreignKey: 'cashboxId' });
CashDetail.belongsTo(CashBox, { foreignKey: 'cashboxId' });

//Caja --> CashBox
CashBox.hasMany(Transfer, { foreignKey: "cashboxId" });
Transfer.belongsTo(CashBox, { foreignKey: "cashboxId" });


//USER <--> Transfer
User.belongsToMany(Transfer, {
  through: "UserTransfer", // nombre de la tabla intermedia
  foreignKey: "userId",
  otherKey: "transferId",
});

Transfer.belongsToMany(User, {
  through: "UserTransfer",
  foreignKey: "transferId",
  otherKey: "userId",
});


// // Una caja puede estar asociada como caja de mañana o tarde en una planilla
// CashBox.hasOne(Sheet, { as: 'comoCajaManana', foreignKey: 'cajaMananaId' });
// CashBox.hasOne(Sheet, { as: 'comoCajaTarde', foreignKey: 'cajaTardeId' });

 
module.exports = {
  CashBox,
  CashDetail,
  Company,
  Movement,
  sequelize,
  Sheet,
  SuperAdmin,
  Transfer,
  User,
  UserTransfer
};;
