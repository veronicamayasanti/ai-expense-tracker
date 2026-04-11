const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilioController');

// Twilio webhook endpoint (POST)
// Note: We don't apply JWT middleware here because requests come from Twilio
router.post('/twilio', twilioController.handleTwilioWebhook);

module.exports = router;
