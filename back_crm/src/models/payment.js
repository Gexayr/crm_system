module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.STRING
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true
    },
    paymentDate: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.TEXT
    },
    metadata: {
      type: DataTypes.JSON
    }
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  };

  return Payment;
}; 