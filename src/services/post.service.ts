import API from './api';

export const createPost = (data: any) =>
  API.post('/posts', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const fetchFeed = () => API.get('/posts/feed');
export const likePost = (postId: string) => API.put(`/posts/like/${postId}`);
export const commentPost = (postId: string, comment: string) =>
  API.post(`/posts/comment/${postId}`, { comment });
