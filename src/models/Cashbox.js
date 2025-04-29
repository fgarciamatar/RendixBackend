
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cashbox = sequelize.define('Cashbox', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shift: {
      type: DataTypes.ENUM('morning', 'evening'),
      allowNull: false
    },
    totalCash: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Cashbox.associate = (models) => {
    Cashbox.hasMany(models.Movement, { foreignKey: 'cashboxId' });
    Cashbox.belongsTo(models.CashReport, { foreignKey: 'cashReportId' });
    Cashbox.hasOne(models.CashDetail, { foreignKey: 'cashboxId' });
  };

  return Cashbox;
};
