import api from '../../../services/apiInstance';

export const transactionService = {
  add: (data) => api.post('/transactions', data),
  getStats: (startDate, endDate) => api.get('/transactions/stats', { params: { startDate, endDate } }),
  getHistory: (limit = 10) => api.get('/transactions/history', { params: { limit } }),
};
