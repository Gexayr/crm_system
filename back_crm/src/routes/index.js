const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');
const leadRoutes = require('./lead.routes');
const activityRoutes = require('./activity.routes');
const paymentRoutes = require('./payment.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/leads', leadRoutes);
router.use('/activities', activityRoutes);
router.use('/payments', paymentRoutes);

module.exports = router; 