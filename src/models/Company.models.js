const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  superAdminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "SuperAdmins",
      key: "id",
    },
  },
});

module.exports = Company;
