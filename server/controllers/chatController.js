const { processUserInput } = require('../services/aiService');
const transactionService = require('../services/transactionService');

async function processChat(req, res) {
  const { input } = req.body;
  const user = req.user;

  if (!input) return res.status(400).json({ error: 'Input required' });

  // Initialize message history for this turn
  let messages = [
    { role: 'system', content: require('../services/aiService').getSystemPrompt(user.name) },
    { role: 'user', content: input }
  ];

  try {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { tools } = require('../services/aiService');

    let response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      tools: tools,
      tool_choice: 'auto',
    });

    let aiMessage = response.choices[0].message;
    const finalResults = [];

    // Loop to handle tool calls
    while (aiMessage.tool_calls) {
      messages.push(aiMessage);
      
      for (const toolCall of aiMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        let resultData;

        if (functionName === 'create_transaction') {
          resultData = await transactionService.createTransaction(user.id, args);
          finalResults.push({ type: 'create', transactionType: args.type, data: resultData });
        } else if (functionName === 'get_financial_stats') {
          resultData = await transactionService.getStats(user.id, args.start_date, args.end_date);
          finalResults.push({ type: 'stats', data: resultData, period: { start: args.start_date, end: args.end_date } });
        }

        messages.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: JSON.stringify(resultData || { error: 'Data tidak ditemukan' }),
        });
      }

      // Second pass: force the AI to read results
      response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
      });
      aiMessage = response.choices[0].message;
    }

    const finalResponseText = aiMessage.content || 'Saya sudah memproses data Anda, Kak! Ada lagi yang bisa Artha bantu?';

    return res.json({ 
      status: 'success', 
      message: finalResponseText,
      results: finalResults 
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
