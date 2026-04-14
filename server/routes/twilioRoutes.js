const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const twilioController = require('../controllers/twilioController');

// Twilio webhook endpoint (POST)
// Note: We don't apply JWT middleware here because requests come from Twilio
// Instead, we validate the Twilio request signature for security
router.post('/twilio', twilio.webhook({ validate: process.env.NODE_ENV === 'production' }), twilioController.handleTwilioWebhook);

module.exports = router;
