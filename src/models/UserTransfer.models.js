const { DataTypes } = require("sequelize")
const { sequelize } = require("../models/database")

const UserTransfer = sequelize.define("UserTransfer", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  transferId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Transfers",
      key: "id",
    },
  },
}, {
  timestamps: false, // opcional si no querés createdAt / updatedAt
});
