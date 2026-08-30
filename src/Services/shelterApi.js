import api from './api';

export const getShelters = () => api.get('/shelters');
export const searchShelters = (search) => api.get('/shelters/search', { params: { search } });
export const getShelterById = (id) => api.get(`/shelters/${id}`);
export const createShelter = (data) => api.post('/shelters', data);
export const updateShelter = (id, data) => api.put(`/shelters/${id}`, data);
export const deleteShelter = (id) => api.delete(`/shelters/${id}`);
