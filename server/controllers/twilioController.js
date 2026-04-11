const twilio = require('twilio');
const { findUserByWhatsapp } = require('../models/user.model');
const chatService = require('../services/chatService');

/**
 * Handle incoming messages from Twilio WhatsApp Hook
 */
async function handleTwilioWebhook(req, res) {
  const { Body, From } = req.body;
  
  console.log(`Received WhatsApp message from ${From}: ${Body}`);

  const twiml = new twilio.twiml.MessagingResponse();

  try {
    // 1. Find user by phone number
    const user = await findUserByWhatsapp(From);

    if (!user) {
      twiml.message("Maaf, nomor WhatsApp Anda belum terdaftar di sistem Artha. Silakan update profil Anda di dashboard web Artha terlebih dahulu.");
      return res.type('text/xml').send(twiml.toString());
    }

    // 2. Process message using Artha Chat Service
    const result = await chatService.processChatMessage(Body, user);

    // 3. Send AI response back to user
    twiml.message(result.message);
    
    return res.type('text/xml').send(twiml.toString());

  } catch (error) {
    console.error('Twilio Webhook Error:', error);
    twiml.message("Waduh, maaf Kak, Artha sedang mengalami gangguan teknis sebentar. Coba lagi nanti ya!");
    return res.type('text/xml').send(twiml.toString());
  }
}

module.exports = {
  handleTwilioWebhook,
};
