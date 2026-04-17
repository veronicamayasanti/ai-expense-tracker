const { createTransactionRecord, getAggregateTransactions, getRecentTransactions, getUserBalance, countTransactions, updateTransactionRecord, deleteTransactionRecord } = require('../models/transaction.model');

async function createTransaction(userId, data) {
  // Add validation logic
  if (!data.amount || isNaN(parseInt(data.amount)) || parseInt(data.amount) <= 0) {
    throw new Error('Amount must be a positive number');
  }
  
  if (!data.description || data.description.trim() === '') {
    throw new Error('Description is required');
  }

  const transaction = await createTransactionRecord(userId, data);
  const balance = await getUserBalance(userId);
  
  return {
    ...transaction,
    currentBalance: balance
  };
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
    countTransactions(userId)
  ]);
  
  return {
    transactions,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: parseInt(page)
  };
}

async function updateTransaction(transactionId, userId, data) {
  const transaction = await updateTransactionRecord(transactionId, userId, data);
  const balance = await getUserBalance(userId);
  return { ...transaction, currentBalance: balance };
}

async function deleteTransaction(transactionId, userId) {
  await deleteTransactionRecord(transactionId, userId);
  return await getUserBalance(userId);
}

module.exports = {
  createTransaction,
  getTotalAmount,
  getStats,
  getHistory,
  getUserBalance,
  updateTransaction,
  deleteTransaction,
};
