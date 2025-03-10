const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
} = require('../controllers/lead.controller');

// Lead routes
router.use(authenticate); // Protect all lead routes

router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router; 