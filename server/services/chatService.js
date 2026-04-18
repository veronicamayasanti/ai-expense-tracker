const { getSystemPrompt, tools, openai, AI_MODEL } = require('./aiService');
const transactionService = require('./transactionService');

/**
 * Core chat processing logic
 * @param {string} input - User message
 * @param {object} user - User object (at least id and name)
 * @returns {promise<{ message: string, results: Array }>}
 */
async function processChatMessage(input, user) {
  // Fetch initial balance to provide context to AI
  const initialBalance = await transactionService.getUserBalance(user.id);
  
  // Initialize message history
  let messages = [
    { role: 'system', content: getSystemPrompt(user.name, initialBalance) },
    { role: 'user', content: input }
  ];

  try {
    let response = await openai.chat.completions.create({
      model: AI_MODEL,
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
          // Fallback jika AI lupa field wajib
          args.description = args.description || input.substring(0, 30); // Pakai potongan input user jika deskripsi kosong
          args.type = args.type || 'EXPENSE';
          args.category = args.category || 'Lainnya';

          // Sanitasi amount: hapus spasi, hapus desimal (.00/,00), baru hapus titik ribuan
          if (typeof args.amount === 'string') {
            args.amount = args.amount.trim();
            args.amount = args.amount.replace(/[,.]00$/, '');
            args.amount = args.amount.replace(/[.,]/g, '');
          }
          
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
          content: JSON.stringify({
            status: 'SUCCESS',
            message: `Data transaksi '${args.description}' sebesar ${args.amount} berhasil disimpan.`,
            ...resultData,
            INSTRUCTION: `Sampaikan ke user bahwa transaksi berhasil. GUNAKAN SALDO INI: Rp${resultData?.currentBalance || 'Data tidak tersedia'}`
          }),
        });
      }

      // Follow-up pass: let AI read results and potentially call more tools
      response = await openai.chat.completions.create({
        model: AI_MODEL,
        messages: messages,
        tools: tools,
        tool_choice: 'auto',
      });
      aiMessage = response.choices[0].message;
    }

    const finalResponseText = aiMessage.content || 'Saya sudah memproses data Anda, Kak! Ada lagi yang bisa Artha bantu?';

    return {
      message: finalResponseText,
      results: finalResults
    };

  } catch (error) {
    console.error('Core Chat Service Error:', error);
    throw error;
  }
}

module.exports = {
  processChatMessage,
};
