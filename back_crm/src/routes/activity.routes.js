const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} = require('../controllers/activity.controller');

// Activity routes
router.use(authenticate); // Protect all activity routes

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

module.exports = router; 