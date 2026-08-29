import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (details) => api.post('/auth/register', details);
export const getCurrentUser = () => api.get('/auth/me');
