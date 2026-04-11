const prisma = require('../database/db');

async function createTransactionRecord(userId, data) {
  return await prisma.transaction.create({
    data: {
      userId: parseInt(userId),
      amount: parseInt(data.amount),
      description: data.description,
      category: data.category || 'Other',
      type: data.type || 'EXPENSE',
    },
  });
}

async function getAggregateTransactions(userId, startDate, endDate, type = 'EXPENSE') {
  const result = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userId: parseInt(userId),
      type: type,
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate + 'T23:59:59'),
      },
    },
  });
  return result._sum.amount || 0;
}

async function getUserBalance(userId) {
  const aggregates = await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      userId: parseInt(userId),
    },
    _sum: {
      amount: true,
    },
  });

  const income = aggregates.find((a) => a.type === 'INCOME')?._sum.amount || 0;
  const expense = aggregates.find((a) => a.type === 'EXPENSE')?._sum.amount || 0;

  return income - expense;
}

async function getRecentTransactions(userId, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  return await prisma.transaction.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: 'desc' },
    skip: skip,
    take: limit,
  });
}

async function countTransactions(userId) {
  return await prisma.transaction.count({
    where: { userId: parseInt(userId) },
  });
}

module.exports = {
  createTransactionRecord,
  getAggregateTransactions,
  getRecentTransactions,
  countTransactions,
  getUserBalance,
};
