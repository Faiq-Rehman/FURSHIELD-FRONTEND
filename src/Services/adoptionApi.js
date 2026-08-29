import api from './api';

export const getAdoptionListings = (params) => api.get('/adoptions', { params });
export const getAdoptionListingById = (id) => api.get(`/adoptions/${id}`);
export const createAdoptionListing = (data) => api.post('/adoptions', data);
export const updateAdoptionListing = (id, data) => api.put(`/adoptions/${id}`, data);
export const deleteAdoptionListing = (id) => api.delete(`/adoptions/${id}`);
