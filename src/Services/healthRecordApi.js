import api from './api';

export const createHealthRecord = (data) => api.post('/health-records', data);
export const getPetHealthRecords = (petId) => api.get(`/health-records/pet/${petId}`);
export const getHealthRecordById = (id) => api.get(`/health-records/${id}`);
export const updateHealthRecord = (id, data) => api.put(`/health-records/${id}`, data);
export const deleteHealthRecord = (id) => api.delete(`/health-records/${id}`);
