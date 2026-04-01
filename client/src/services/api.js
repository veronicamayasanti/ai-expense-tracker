import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor to add user email header - keeping this for legacy support or changing to Bearer later
api.interceptors.request.use(
  (config) => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      config.headers['x-user-email'] = email;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const transactionService = {
  add: (data) => api.post('/transactions', data),
  getStats: (startDate, endDate) => api.get('/transactions/stats', { params: { startDate, endDate } }),
  getHistory: (limit = 10) => api.get('/transactions/history', { params: { limit } }),
};

export const aiService = {
  chat: (input) => api.post('/chat', { input }),
};

export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.patch('/user/profile', data),
};

export default api;
