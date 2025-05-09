import { useState, useEffect } from 'react';
import { UploadCloud, Trash2 } from 'lucide-react';
import newRequest from '../utils/newRequest';
import { useNavigate } from 'react-router-dom';

export default function PostSection({ user, business, isOwnProfile, isVerified }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await newRequest.get(`/posts/business/${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    if (user?._id) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      await newRequest.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="mt-6 px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Posts</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Upload button */}
        {isVerified && isOwnProfile && (
          <button
            className="w-[30%] min-w-[150px] h-32 bg-green-100 hover:bg-green-200 text-green-700 flex flex-col items-center justify-center rounded-lg"
            onClick={() => navigate('/postPage')}
          >
            <UploadCloud className="w-6 h-6 mb-1" />
            <span>Upload</span>
          </button>
        )}

        {/* Render posts */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="w-[30%] min-w-[150px] h-32 bg-gray-100 rounded-lg relative overflow-hidden"
            >
              {/* Delete icon (only for own profile) */}
              {isOwnProfile && (
                <button
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(post._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {post.image ? (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-sm text-gray-500 flex items-center justify-center w-full h-full">
                  No Image
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500">No posts available.</div>
        )}
      </div>
    </div>
  );
}
