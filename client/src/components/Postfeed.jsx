import { UserCircle, MessageSquare, Share2, Heart } from 'lucide-react';
import newRequest from '../utils/newRequest';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        const res = await newRequest.get("/posts/");
        const data = res.data.posts || res.data;
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 no-scrollbar">
      {Array.isArray(posts) && posts.map((post, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4">
          {/* User Info */}
          <div className="flex items-center mb-2">
            <UserCircle className="w-8 h-8 text-gray-600" />
            <Link to={`/profile/${post.userId}`} className="ml-2 font-semibold text-gray-800 hover:underline">
              {post.username || "User"}
            </Link>
          </div>

          {/* Post Description */}
          <p className="text-gray-700 mb-3">{post.description}</p>

          {/* Post Images */}
          {Array.isArray(post.image) && post.image.length > 0 && (
            <div className="flex overflow-x-auto gap-2 mb-3">
              {post.image.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Post image ${i + 1}`}
                  className="h-40 rounded-md object-cover"
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-around mt-2">
            <button className="flex items-center gap-1 text-white bg-[#004d38] px-3 py-1 rounded-md text-sm">
              <Heart className="w-4 h-4" />
              Like
            </button>
            <button className="flex items-center gap-1 text-white bg-[#004d38] px-3 py-1 rounded-md text-sm">
              <MessageSquare className="w-4 h-4" />
              Comment
            </button>
            <button className="flex items-center gap-1 text-white bg-[#004d38] px-3 py-1 rounded-md text-sm">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
