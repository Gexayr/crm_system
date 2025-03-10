module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define('Lead', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'),
      defaultValue: 'new'
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    expectedCloseDate: {
      type: DataTypes.DATE
    },
    source: {
      type: DataTypes.STRING
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    lastActivityDate: {
      type: DataTypes.DATE
    }
  });

  Lead.associate = (models) => {
    Lead.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Lead.belongsTo(models.User, {
      foreignKey: 'assignedTo',
      as: 'assignedUser'
    });
    Lead.hasMany(models.Activity, {
      foreignKey: 'leadId',
      as: 'activities'
    });
  };

  return Lead;
}; 