import React from 'react';
import PostCard from '../post/PostCard';
import { useAuth } from '../../context/AuthContext';

interface Comment {
  name: string;
  comment: string;
}

interface Post {
  id: number;
  user: string;
  content: string;
  privacy: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

interface UserPostsProps {
  posts: any[];
  toggleLike: (id: number) => void;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts, toggleLike }) => {
  const { user } = useAuth();

  // Normalize post data to match PostCard's expected format
  const normalizedPosts = posts.map((post) => ({
    id: post._id,
    user: post.userId?.name || 'Unknown User',
    content: post.content,
    image: post.mediaType === 'image' ? post.mediaUrl : '',
    privacy: post.privacy,
    likes: post.likes?.length || 0,
    liked: post.likes?.includes(user.id) || false,
    comments:
      post.comments?.map((c: any) => ({
        name: c.userId?.name || 'User',
        comment: c.comment,
      })) || [],
  }));

  return (
    <div className="space-y-6">
      {normalizedPosts.map((post) => (
        <PostCard key={post.id} post={post} toggleLike={toggleLike} />
      ))}
    </div>
  );
};

export default UserPosts;
