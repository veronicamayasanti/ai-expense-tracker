const { createTransactionRecord, getAggregateTransactions, getRecentTransactions } = require('../models/transaction.model');

async function createTransaction(userId, data) {
  // Add validation logic here if needed
  if (!data.amount || data.amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }
  return await createTransactionRecord(userId, data);
}

async function getTotalAmount(userId, startDate, endDate, type = 'EXPENSE') {
  return await getAggregateTransactions(userId, startDate, endDate, type);
}

async function getStats(userId, startDate, endDate) {
  const [totalIncome, totalExpense] = await Promise.all([
    getAggregateTransactions(userId, startDate, endDate, 'INCOME'),
    getAggregateTransactions(userId, startDate, endDate, 'EXPENSE')
  ]);
  
  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense
  };
}

async function getHistory(userId, limit, page) {
  const [transactions, totalCount] = await Promise.all([
    getRecentTransactions(userId, limit, page),
    require('../models/transaction.model').countTransactions(userId)
  ]);
  
  return {
    transactions,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page)
  };
}

module.exports = {
  createTransaction,
  getTotalAmount,
  getStats,
  getHistory,
};
