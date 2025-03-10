const { Payment, Customer } = require('../models');

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: {
        payments
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        payment
      }
    });
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);

    // Update customer's total revenue
    const customer = await Customer.findByPk(payment.customerId);
    if (customer && payment.status === 'completed') {
      await customer.update({
        totalRevenue: customer.totalRevenue + parseFloat(payment.amount)
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        payment
      }
    });
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
    }

    const oldStatus = payment.status;
    const oldAmount = payment.amount;

    await payment.update(req.body);

    // Update customer's total revenue if payment status changes
    if (payment.status !== oldStatus || payment.amount !== oldAmount) {
      const customer = await Customer.findByPk(payment.customerId);
      if (customer) {
        let revenueAdjustment = 0;

        // Remove old amount if it was completed
        if (oldStatus === 'completed') {
          revenueAdjustment -= parseFloat(oldAmount);
        }

        // Add new amount if it's completed
        if (payment.status === 'completed') {
          revenueAdjustment += parseFloat(payment.amount);
        }

        await customer.update({
          totalRevenue: customer.totalRevenue + revenueAdjustment
        });
      }
    }

    res.json({
      status: 'success',
      data: {
        payment
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
    }

    // Update customer's total revenue if deleting a completed payment
    if (payment.status === 'completed') {
      const customer = await Customer.findByPk(payment.customerId);
      if (customer) {
        await customer.update({
          totalRevenue: customer.totalRevenue - parseFloat(payment.amount)
        });
      }
    }

    await payment.destroy();

    res.json({
      status: 'success',
      message: 'Payment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
}; 