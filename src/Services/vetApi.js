import api from './api';

export const getVets = () => api.get('/vets');
export const searchVets = (search) => api.get('/vets/search', { params: { search } });
export const getVetById = (id) => api.get(`/vets/${id}`);
