export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  isFollowing: boolean;
  // Add other fields as needed
}

export interface UserPost {
  _id: string;
  userId: string;
  content: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  privacy: string;
  likes: string[]; // array of user IDs
  liked: boolean;
  comments: { userId: { name: string }; comment: string }[];
  createdAt: string;
}
