import api from './api';

export const createAppointment = (data) => api.post('/appointments', data);
export const getMyAppointments = () => api.get('/appointments');
export const getAppointmentById = (id) => api.get(`/appointments/${id}`);
export const updateAppointmentStatus = (id, status) => api.put(`/appointments/${id}/status`, { status });
export const cancelAppointment = (id) => api.put(`/appointments/${id}/cancel`);
