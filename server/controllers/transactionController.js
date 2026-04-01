const transactionService = require('../services/transactionService');

async function addTransaction(req, res) {
  try {
    const userId = req.user.id; // From Auth Middleware
    const data = req.body;
    
    const transaction = await transactionService.createTransaction(userId, data);
    
    res.status(201).json({
      status: 'success',
      message: `${data.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'} berhasil dicatat`,
      data: transaction
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}

async function getStats(req, res) {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    
    const stats = await transactionService.getStats(userId, startDate, endDate);
    
    res.json({
      status: 'success',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

async function getHistory(req, res) {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    
    const history = await transactionService.getHistory(userId, limit);
    
    res.json({
      status: 'success',
      data: history
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

module.exports = {
  addTransaction,
  getStats,
  getHistory,
};
