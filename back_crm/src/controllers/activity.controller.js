const { Activity, User, Customer, Lead } = require('../models');

const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'title', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: {
        activities
      }
    });
  } catch (error) {
    next(error);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'title', 'status']
        }
      ]
    });

    if (!activity) {
      return res.status(404).json({
        status: 'error',
        message: 'Activity not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        activity
      }
    });
  } catch (error) {
    next(error);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        activity
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({
        status: 'error',
        message: 'Activity not found'
      });
    }

    // Only allow the creator or admin to update the activity
    if (activity.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this activity'
      });
    }

    await activity.update(req.body);

    res.json({
      status: 'success',
      data: {
        activity
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({
        status: 'error',
        message: 'Activity not found'
      });
    }

    // Only allow the creator or admin to delete the activity
    if (activity.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this activity'
      });
    }

    await activity.destroy();

    res.json({
      status: 'success',
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
}; 