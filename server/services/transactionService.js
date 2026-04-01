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

async function getHistory(userId, limit) {
  return await getRecentTransactions(userId, limit);
}

module.exports = {
  createTransaction,
  getTotalAmount,
  getStats,
  getHistory,
};
