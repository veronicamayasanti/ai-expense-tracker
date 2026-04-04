import api from '../../../services/apiInstance';

export const aiService = {
  chat: (input) => api.post('/chat', { input }),
};
