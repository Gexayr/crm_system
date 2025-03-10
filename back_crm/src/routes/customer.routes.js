const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');

// Customer routes
router.use(authenticate); // Protect all customer routes

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router; 