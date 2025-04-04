import API from './api';

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or however you're storing it
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUserProfile = (userId: string) => API.get(`/users/${userId}`);
export const fetchUsers = (search = '') =>
  API.get(`/users?search=${encodeURIComponent(search)}`);
export const followUser = (userId: string) =>
  API.post(`/users/${userId}/follow`);
export const unfollowUser = (userId: string) =>
  API.post(`/users/${userId}/unfollow`);
export const getUserPosts = (userId: string) =>
  API.get(`/posts/user/${userId}`);
