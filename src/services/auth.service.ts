import API from './api';

export const registerUser = (data: any) => API.post('/auth/register', data);
export const loginUser = (data: any) => API.post('/auth/login', data);
