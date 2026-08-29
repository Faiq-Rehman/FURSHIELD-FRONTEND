import api from './api';

export const createPet = (data) => api.post('/pets', data);
export const getMyPets = () => api.get('/pets');
export const getPetById = (id) => api.get(`/pets/${id}`);
export const updatePet = (id, data) => api.put(`/pets/${id}`, data);
export const deletePet = (id) => api.delete(`/pets/${id}`);
