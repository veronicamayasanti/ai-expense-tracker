const { createExpenseRecord, getAggregateExpense } = require('../models/expense.model');

async function createExpense(amount, description) {
  // Business logic can be added here (e.g., validation or logging)
  return await createExpenseRecord(amount, description);
}

async function getTotalExpense(startDate, endDate) {
  // Business logic mapping dates etc.
  return await getAggregateExpense(startDate, endDate);
}

module.exports = {
  createExpense,
  getTotalExpense,
};
