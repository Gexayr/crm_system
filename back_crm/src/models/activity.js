module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('call', 'email', 'meeting', 'note', 'task'),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dueDate: {
      type: DataTypes.DATE
    },
    completedDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    outcome: {
      type: DataTypes.TEXT
    }
  });

  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Activity.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Activity.belongsTo(models.Lead, {
      foreignKey: 'leadId',
      as: 'lead'
    });
  };

  return Activity;
}; 