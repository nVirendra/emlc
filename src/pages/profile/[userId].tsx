import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getUserProfile,
  followUser,
  unfollowUser,
  getUserPosts,
} from '../../services/user.service';
import { useAuth } from '../../context/AuthContext';
import ProfileHeader from '../../components/profile/ProfileHeader';
import UserPosts from '../../components/profile/UserPosts';
import MainLayout from '../../layouts/MainLayout';
import { likePost } from '../../services/post.service';

const UserProfile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then((res) => setProfile(res.data));
      getUserPosts(userId).then((res) => setPosts(res.data));
    }
  }, [userId]);

  const handleFollow = async () => {
    console.log('profile', profile);
    if (!profile) return;
    const res = profile.isFollowing
      ? await unfollowUser(userId)
      : await followUser(userId);
    setProfile((prev) => ({ ...prev, isFollowing: !prev.isFollowing }));
  };

  if (!profile) return <div>Loading...</div>;

  const toggleLike = async (postId: number) => {
    try {
      // Optimistic update
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user.id)
                  ? post.likes.filter((id: string) => id !== user.id)
                  : [...post.likes, user.id],
                liked: !post.likes.includes(user.id),
              }
            : post
        )
      );

      await likePost(postId.toString());
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert on error
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user.id)
                  ? post.likes.filter((id: string) => id !== user.id)
                  : [...post.likes, user.id],
                liked: !post.likes.includes(user.id),
              }
            : post
        )
      );
    }
  };

  return (
    <MainLayout>
      <section className="lg:col-span-8 lg:col-start-3 space-y-6">
        <ProfileHeader
          profile={profile}
          onFollowToggle={handleFollow}
          isMe={user._id === userId}
        />
        <UserPosts posts={posts} toggleLike={toggleLike} />
      </section>
    </MainLayout>
  );
};

export default UserProfile;
