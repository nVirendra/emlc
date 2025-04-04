import React, { useEffect, useState } from 'react';
import PostCard from '../post/PostCard';
import CreatePost from '../../pages/post/CreatePost';
import { fetchFeed, likePost } from '../../services/post.service';
import { useAuth } from '../../context/AuthContext';
import { sendNotification } from '../../lib/triggerNotification';

interface Post {
  id: string;
  user: string;
  userId: string;
  content: string;
  image: string;
  video?: string;
  privacy: string;
  likes: number;
  liked: boolean;
  comments: { name: string; comment: string }[];
  createdAt: string;
}

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await fetchFeed();
        const normalizedPosts = data.map((post: any) => ({
          id: post._id,
          user: post.userId?.name || 'Unknown User',
          userId: post.userId?._id || '',
          content: post.content,
          image: post.mediaType === 'image' ? post.mediaUrl : '',
          video: post.mediaType === 'video' ? post.mediaUrl : '',
          likes: post.likes.length,
          liked: post.likes.includes(user?.id),
          comments: post.comments.map((c: any) => ({
            name: c.userId?.name || 'User',
            comment: c.comment,
          })),
          privacy: post.privacy,
          createdAt: post.createdAt,
        }));

        setPosts(normalizedPosts);
      } catch (error) {
        console.error('Fetch Feed failed:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPostRaw: any) => {
    const newPost: Post = {
      id: newPostRaw._id,
      user: newPostRaw.userId?.name || 'Unknown User',
      userId: newPostRaw.userId?._id || '',
      content: newPostRaw.content,
      image: newPostRaw.mediaType === 'image' ? newPostRaw.mediaUrl : '',
      video: newPostRaw.mediaType === 'video' ? newPostRaw.mediaUrl : '',
      likes: newPostRaw.likes?.length || 0,
      liked: newPostRaw.likes?.includes(user?.id) || false,
      comments: [],
      privacy: newPostRaw.privacy,
      createdAt: newPostRaw.createdAt,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLike = async (id: string) => {
    const currentUser = user;
    let receiverId: string | null = null;

    try {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === id) {
            if (!post.liked) receiverId = post.userId;
            return {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            };
          }
          return post;
        })
      );

      await likePost(id);

      if (receiverId && currentUser?.id && currentUser.id !== receiverId) {
        await sendNotification({
          senderId: currentUser.id,
          receiverId,
          postId: id,
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <section className="space-y-6">
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} toggleLike={toggleLike} />
      ))}
    </section>
  );
};

export default Feed;
