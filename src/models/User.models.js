const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("salesman", "cashier", "admin"),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Companies", // Debe coincidir con el nombre de la tabla, no del archivo
      key: "id",
    },
    lastTransferAt: {
      type: DataTypes.DATE,
      // allowNull: true,
    },
  },
});

module.exports = User;
