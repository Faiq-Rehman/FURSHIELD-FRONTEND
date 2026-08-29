import api from './api';

export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const getAdminOverview = () => api.get('/admin/overview');
