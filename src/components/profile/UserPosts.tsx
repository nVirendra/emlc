import React from 'react';
import PostCard from '../post/PostCard';
import { useAuth } from '../../context/AuthContext';
import { FeedPost, Comment } from '../../types/feedpost';

interface UserPostsProps {
  posts: any[];
  toggleLike: (id: string) => Promise<void>;
}

const UserPosts: React.FC<UserPostsProps> = ({ posts, toggleLike }) => {
  const { user } = useAuth();

  const normalizedPosts: FeedPost[] = posts.map((post) => ({
    id: post._id,
    user: post.userId?.name || 'Unknown User',
    userId: post.userId?._id || '',
    content: post.content,
    image: post.mediaType === 'image' ? post.mediaUrl : '',
    video: post.mediaType === 'video' ? post.mediaUrl : '',
    privacy: post.privacy,
    likes: post.likes?.length || 0,
    liked: post.likes?.includes(user?.id) || false,
    comments:
      post.comments?.map(
        (c: any): Comment => ({
          name: c.userId?.name || 'User',
          comment: c.comment,
        })
      ) || [],
    createdAt: post.createdAt,
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
