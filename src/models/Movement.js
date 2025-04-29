
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movement = sequelize.define('Movement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    movementType: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false
    },
    conceptType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cashboxId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Movement.associate = (models) => {
    Movement.belongsTo(models.Cashbox, { foreignKey: 'cashboxId' });
  };

  return Movement;
};
