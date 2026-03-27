const { processUserInput } = require('../services/aiService');
const { createExpense, getTotalExpense } = require('../services/expenseService');

async function processChat(req, res) {
  const { input } = req.body;
  if (!input) return res.status(400).json({ error: 'Input required' });

  try {
    const aiMessage = await processUserInput(input);

    if (aiMessage.tool_calls) {
      const results = [];
      for (const toolCall of aiMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);

        let result;
        if (functionName === 'create_expense') {
          result = await createExpense(args.amount, args.description);
          results.push({ type: 'create', data: result });
        } else if (functionName === 'get_total_expense') {
          result = await getTotalExpense(args.start_date, args.end_date);
          results.push({ type: 'total', data: result, start: args.start_date, end: args.end_date });
        }
      }
      return res.json({ success: true, results });
    }

    return res.json({ success: false, message: 'AI tidak mengenali perintah pengeluaran.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

module.exports = {
  processChat,
};
