const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Payment } = require('../models');

// Get all payments
router.get('/', auth, async (req, res) => {
  try {
    const payments = await Payment.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single payment
router.get('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create payment
router.post('/', auth, async (req, res) => {
  try {
    const payment = await Payment.create({
      invoiceNumber: req.body.invoiceNumber,
      customer: req.body.customer,
      amount: req.body.amount,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date,
      dueDate: req.body.dueDate,
      userId: req.user.id
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update payment
router.put('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.update(req.body);
    const updatedPayment = await Payment.findByPk(req.params.id);
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete payment
router.delete('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.destroy();
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 