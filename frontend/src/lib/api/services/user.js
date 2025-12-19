import api from '../client';

export const getProfile = (username) => api.get(`/user/${username}`);