import { useState, useEffect, useContext } from 'react';
import { MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import ProfileHeader from '../components/ProfileHeader';
import PostSection from '../components/PostSection';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() { 
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const loggedInUserId = currentUser?._id;
  const navigate=useNavigate();

  const [user, setUser] = useState(null); 
  const [business, setBusiness] = useState(null); 
  
  const handleMessageClick = () => {
    if (!currentUser) {
      const confirmLogin = window.confirm("You are not logged in. Would you like to go to the login page?");
      if (confirmLogin) {
        navigate('/login');
      }
    } else {
      navigate('/profile/:userId/chats');
    }
  };
  

  
  useEffect(() => { 
    const fetchUserAndBusiness = async () => {
      try { 
        // Fetch user details
        const userRes = await newRequest.get(`/users/${userId}`);
        setUser(userRes.data);

        // Fetch business details only if the user is verified
        if (userRes.data.isVerified) {
          const businessRes = await newRequest.get(`/business/${userId}`);
          if (businessRes.data) { 
            setBusiness(businessRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch user or business:', err);
      }
    };

    fetchUserAndBusiness();
  }, [userId]);

  if (!user) return <div className="p-4 text-center">Loading profile...</div>;

  const isOwnProfile = loggedInUserId && userId.toString() === loggedInUserId.toString();

  // console.log("User ID from URL:", userId); 
  // console.log("Logged-in User ID:", loggedInUserId); 

  return ( 
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      
      <ProfileHeader 
        user={user} 
        business={business} 
        isOwnProfile={isOwnProfile} 
        isVerified={user?.isVerified} 
      />

      {/* Message Button */}
      {!isOwnProfile && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleMessageClick}
            className="bg-[#004d38] text-white rounded-full p-3 shadow hover:bg-green-700 transition duration-200"
            title="Message"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Post Section */}
      <PostSection 
        user={user} 
        business={business} 
        isOwnProfile={isOwnProfile} 
        isVerified={user?.isVerified} 
      />
    </div>
  );
}