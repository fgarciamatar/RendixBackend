
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transfer = sequelize.define('Transfer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    clientNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    originBank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinationBank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receipt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Transfer.associate = (models) => {
    Transfer.belongsTo(models.User, { foreignKey: 'userId' });
    Transfer.belongsTo(models.Company, { foreignKey: 'companyId' });
  };

  return Transfer;
};
