const { getSystemPrompt, tools } = require('../services/aiService');
const transactionService = require('../services/transactionService');
const { OPENAI_API_KEY } = require('../config/env');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function processChat(req, res) {
  const { input } = req.body;
  const user = req.user;

  if (!input) return res.status(400).json({ status: 'error', message: 'Input required' });

  // Initialize message history
  let messages = [
    { role: 'system', content: getSystemPrompt(user.name) },
    { role: 'user', content: input }
  ];

  try {
    let response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      tools: tools,
      tool_choice: 'auto',
    });

    let aiMessage = response.choices[0].message;
    const finalResults = [];
    
    let loopCount = 0;
    const MAX_LOOPS = 5;

    // Loop to handle tool calls with safety guard
    while (aiMessage.tool_calls && loopCount < MAX_LOOPS) {
      loopCount++;
      messages.push(aiMessage);
      
      for (const toolCall of aiMessage.tool_calls) {
        const functionName = toolCall.function.name;
        let args = {};
        
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch (parseErr) {
          console.error('Failed to parse tool arguments:', parseErr);
        }

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
          content: JSON.stringify(resultData || { error: 'Gagal mendapatkan data atau data tidak ditemukan' }),
        });
      }

      // Second pass: force the AI to read results
      response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
      });
      aiMessage = response.choices[0].message;
    }

    if (loopCount >= MAX_LOOPS) {
      console.warn('Chat loop guard triggered (MAX_LOOPS reached)');
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
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = {
  processChat,
};
