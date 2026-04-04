import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptor to add user email header
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

export default api;
