const { Lead, Activity, Customer } = require('../models');

const getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.findAll({
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
        leads
      }
    });
  } catch (error) {
    next(error);
  }
};

const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Activity,
          as: 'activities',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!lead) {
      return res.status(404).json({
        status: 'error',
        message: 'Lead not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        lead
      }
    });
  } catch (error) {
    next(error);
  }
};

const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user.id
    });

    // Create an activity for lead creation
    await Activity.create({
      type: 'note',
      subject: 'Lead Created',
      description: `Lead ${lead.title} was created`,
      userId: req.user.id,
      leadId: lead.id,
      customerId: lead.customerId
    });

    res.status(201).json({
      status: 'success',
      data: {
        lead
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        status: 'error',
        message: 'Lead not found'
      });
    }

    const oldStatus = lead.status;
    await lead.update(req.body);

    // Create an activity for lead update
    await Activity.create({
      type: 'note',
      subject: 'Lead Updated',
      description: oldStatus !== lead.status
        ? `Lead status changed from ${oldStatus} to ${lead.status}`
        : `Lead ${lead.title} was updated`,
      userId: req.user.id,
      leadId: lead.id,
      customerId: lead.customerId
    });

    res.json({
      status: 'success',
      data: {
        lead
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        status: 'error',
        message: 'Lead not found'
      });
    }

    await lead.destroy();

    res.json({
      status: 'success',
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
}; 