const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} = require('../controllers/payment.controller');

// Payment routes
router.use(authenticate); // Protect all payment routes

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router; 