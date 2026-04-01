const { processUserInput } = require('../services/aiService');
const transactionService = require('../services/transactionService');

async function processChat(req, res) {
  const { input } = req.body;
  const user = req.user; // From Auth Middleware

  if (!input) return res.status(400).json({ error: 'Input required' });

  try {
    // Pass user profile for personalized interaction
    const aiMessage = await processUserInput(input, user);

    if (aiMessage.tool_calls) {
      const results = [];
      for (const toolCall of aiMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        if (functionName === 'create_transaction') {
          const result = await transactionService.createTransaction(user.id, args);
          results.push({ 
            type: 'create', 
            transactionType: args.type,
            data: result 
          });
        } else if (functionName === 'get_financial_stats') {
          const stats = await transactionService.getStats(user.id, args.start_date, args.end_date);
          results.push({ 
            type: 'stats', 
            data: stats, 
            period: { start: args.start_date, end: args.end_date } 
          });
        }
      }
      return res.json({ 
        status: 'success', 
        message: aiMessage.content || 'Permintaan diproses',
        results 
      });
    }

    // Fallback if no tool is called but AI responded with text
    return res.json({ 
      status: 'success', 
      message: aiMessage.content || 'Saya tidak mengerti maksud Anda.',
      results: [] 
    });

  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Gagal memproses pesan', 
      details: error.message 
    });
  }
}

module.exports = {
  processChat,
};
