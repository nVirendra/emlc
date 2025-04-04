export const sendNotification = async ({
  senderId,
  receiverId,
  postId,
}: {
  senderId: string;
  receiverId: string;
  postId: string;
}) => {
  await fetch('http://localhost:5000/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId, postId }),
  });
};
