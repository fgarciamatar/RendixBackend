
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Company.associate = (models) => {
    Company.hasMany(models.User, { foreignKey: 'companyId' });
    Company.hasMany(models.Transfer, { foreignKey: 'companyId' });
    Company.hasMany(models.CashReport, { foreignKey: 'companyId' });
  };

  return Company;
};
