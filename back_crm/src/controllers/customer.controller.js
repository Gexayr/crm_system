const { Customer, Activity } = require('../models');

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: {
        customers
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Activity,
          as: 'activities',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);

    // Create an activity for customer creation
    await Activity.create({
      type: 'note',
      subject: 'Customer Created',
      description: `Customer ${customer.name} was created`,
      userId: req.user.id,
      customerId: customer.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    await customer.update(req.body);

    // Create an activity for customer update
    await Activity.create({
      type: 'note',
      subject: 'Customer Updated',
      description: `Customer ${customer.name} was updated`,
      userId: req.user.id,
      customerId: customer.id
    });

    res.json({
      status: 'success',
      data: {
        customer
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    await customer.destroy();

    res.json({
      status: 'success',
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}; 