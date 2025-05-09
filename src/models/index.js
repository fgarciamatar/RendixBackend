const { sequelize } = require("../models/database.js");
const CashBox = require("./CashBox.models.js");
const CashDetail = require("./CashDetail.models.js");
const Company = require("./Company.models.js");
const Movement = require("./Movement.models.js");
const Sheet = require("./Sheets.models.js");
const SuperAdmin = require("./SuperAdmin.models.js");
const Transfer = require("./Transfer.models.js");
const User = require("./User.models.js");
// SuperAdmin → Company
SuperAdmin.hasMany(Company, { foreignKey: "superAdminId" });
Company.belongsTo(SuperAdmin, { foreignKey: "superAdminId" });

// Company → User, Transfer, Sheet
Company.hasMany(User, { foreignKey: "companyId" });
User.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Transfer, { foreignKey: "companyId" });
Transfer.belongsTo(Company, { foreignKey: "companyId" });

Company.hasMany(Sheet, { foreignKey: "companyId" });
Sheet.belongsTo(Company, { foreignKey: "companyId" });

// Sheet → CashBox (morning, afternoon)
Sheet.hasMany(CashBox, { foreignKey: "sheetId" });
CashBox.belongsTo(Sheet, { foreignKey: "sheetId" });

// CashBox → CashDetail
CashBox.hasOne(CashDetail, { foreignKey: "cashBoxId" });
CashDetail.belongsTo(CashBox, { foreignKey: "cashBoxId" });

// CashBox → Movements
CashBox.hasMany(Movement, { foreignKey: "cashBoxId" });
Movement.belongsTo(CashBox, { foreignKey: "cashBoxId" });

 
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
};;
