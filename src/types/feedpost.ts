export interface Comment {
  name: string;
  comment: string;
}

export interface FeedPost {
  id: string | number;
  user: string;
  userId?: string;
  content: string;
  privacy: string;
  image?: string;
  video?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt?: string;
}
