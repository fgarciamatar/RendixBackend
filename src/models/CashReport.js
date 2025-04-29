
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CashReport = sequelize.define('CashReport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    morningCashId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eveningCashId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalCash: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    totalSystem: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  CashReport.associate = (models) => {
    CashReport.belongsTo(models.Company, { foreignKey: 'companyId' });
    CashReport.belongsTo(models.Cashbox, { as: 'morningCash', foreignKey: 'morningCashId' });
    CashReport.belongsTo(models.Cashbox, { as: 'eveningCash', foreignKey: 'eveningCashId' });
  };

  return CashReport;
};
