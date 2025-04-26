import { useState, useEffect } from 'react';
import { UploadCloud, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import newRequest from '../utils/newRequest';

export default function UserProfile() { 
  const [isVerified, setIsVerified] = useState(false);

  const { userId } = useParams(); // 1. Get userId from URL
  const loggedInUserId = Cookies.get('userId'); // 2. Get logged-in userId from cookie
  const [user, setUser] = useState(null); 
  const isOwnProfile = user && user._id === loggedInUserId;

  useEffect(() => { 
    const fetchUser = async () => {
      try {
        const res = await newRequest.get(`/business/${userId}`); // Replace with your backend route
        console.log(res.data);
        setUser(res.data);
        setIsVerified(res.data.business?.verified || false);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleVerify = () => {
    setIsVerified(true);
    // Optionally call API to set verified status
  };

  if (!user) return <div className="p-4 text-center">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="text-2xl font-bold p-4 text-left text-[#004d38]">Xz</div>

      {/* Cover + Profile */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
        />
      </div>

      {/* Username */}
      <div className="text-center mt-16 text-xl font-semibold">{user.name}</div>

      {/* Verify or Business Info */}
      {!isVerified ? (
        isOwnProfile && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleVerify}
              className="bg-[#004d38] text-white px-4 py-2 rounded-full text-sm"
            >
              Verify Business
            </button>
          </div>
        )
      ) : (
        <div className="bg-[#004d38] p-4 mt-4 mx-4 rounded text-white">
          <p><strong>Address:</strong> {user.business.address}</p>
          <p><strong>Description:</strong> {user.business.description}</p>
          <p><strong>Contact:</strong> {user.business.contact}</p>
        </div>
      )}

      {/* Followers */}
      <div className="text-center mt-4 text-gray-600">
        <span className="font-medium">{user.followers}</span> Followers
      </div>

      {/* Message Button */}
      {!isOwnProfile && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-[#004d38] text-white rounded-full p-3 shadow hover:bg-green-700 transition duration-200"
            title="Message"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Posts + Upload */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Posts</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Upload button */}
          {isVerified && isOwnProfile && (
            <button className="w-[30%] min-w-[150px] h-32 bg-green-100 hover:bg-green-200 text-green-700 flex flex-col items-center justify-center rounded-lg">
              <UploadCloud className="w-6 h-6 mb-1" />
              <span>Upload</span>
            </button>
          )}

          {/* {user.posts.map((post, index) => (
            <div
              key={index}
              className="w-[30%] min-w-[150px] h-32 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500"
            >
              {post.title}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

