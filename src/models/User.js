
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('salesman', 'cashier', 'admin'),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Company, { foreignKey: 'companyId' });
    User.hasMany(models.Transfer, { foreignKey: 'userId' });
  };

  return User;
};
