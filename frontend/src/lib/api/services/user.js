import api from '../client';

export const getUser = (username) => api.get(`/user/${username}`);
export const updateUser= (data) => api.put('/user/information', data);