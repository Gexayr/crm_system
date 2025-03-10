module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^\+?[\d\s-]+$/
      }
    },
    company: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'pending'),
      defaultValue: 'active'
    },
    notes: {
      type: DataTypes.TEXT
    },
    lastContactDate: {
      type: DataTypes.DATE
    },
    customerSource: {
      type: DataTypes.STRING
    },
    totalRevenue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Lead, {
      foreignKey: 'customerId',
      as: 'leads'
    });
    Customer.hasMany(models.Activity, {
      foreignKey: 'customerId',
      as: 'activities'
    });
    Customer.hasMany(models.Payment, {
      foreignKey: 'customerId',
      as: 'payments'
    });
  };

  return Customer;
}; 