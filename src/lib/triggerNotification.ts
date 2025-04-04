import API from '../services/api';

export const sendNotification = async ({
  senderId,
  receiverId,
  postId,
}: {
  senderId: string;
  receiverId: string;
  postId: string;
}) => {
  return API.post('/notifications', {
    senderId,
    receiverId,
    postId,
  });
};
