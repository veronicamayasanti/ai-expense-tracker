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

async function getRecentTransactions(userId, limit = 10) {
  return await prisma.transaction.findMany({
    where: { userId: parseInt(userId) },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

module.exports = {
  createTransactionRecord,
  getAggregateTransactions,
  getRecentTransactions,
};
