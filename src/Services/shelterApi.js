import api from './api';

export const getShelters = () => api.get('/shelters');
export const searchShelters = (search) => api.get('/shelters/search', { params: { search } });
export const getShelterById = (id) => api.get(`/shelters/${id}`);
