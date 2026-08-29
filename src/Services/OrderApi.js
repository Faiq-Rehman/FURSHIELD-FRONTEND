import api from './api';

export const createOrder = (orderData) => api.post('/orders', orderData);
export const getMyOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });
export const cancelOrder = (id) => api.put(`/orders/${id}/cancel`);
