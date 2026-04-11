const chatService = require('../services/chatService');

async function processChat(req, res) {
  const { input } = req.body;
  const user = req.user;

  if (!input) return res.status(400).json({ status: 'error', message: 'Input required' });

  try {
    const result = await chatService.processChatMessage(input, user);

    return res.json({ 
      status: 'success', 
      message: result.message,
      results: result.results 
    });

  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Gagal memproses pesan', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = {
  processChat,
};
