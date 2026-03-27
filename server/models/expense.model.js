const prisma = require('../database/db');

async function createExpenseRecord(amount, description) {
  return await prisma.expense.create({
    data: {
      amount: parseInt(amount),
      description,
    },
  });
}

async function getAggregateExpense(startDate, endDate) {
  const result = await prisma.expense.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate + 'T23:59:59'),
      },
    },
  });
  return result._sum.amount || 0;
}

module.exports = {
  createExpenseRecord,
  getAggregateExpense,
};
