import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadWidget from './UploadWidget';
import newRequest from '../utils/newRequest';  

export default function ProfileHeader({ user, business, isOwnProfile, isVerified }) { 
  const [profile, setProfile] = useState(user.profilePic);
  const [cover, setCover] = useState(user.coverImage);
  const [imageUrl, setImgUrl] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null); 
  const navigate = useNavigate(); 


  const handleImageUpload = async (imageUrl) => {
    try {
     
      const isCoverImage = imageToUpdate === 'cover'; 
      const response = await newRequest.put('/users/update-image', {
        userId: user._id, 
        imageUrl,
        isCoverImage
      });

      if (isCoverImage) {
        setCover(imageUrl);
      } else {
        setProfile(imageUrl);
      }

      console.log(response.data); 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  
  useEffect(() => {
    if (imageUrl) {
      handleImageUpload(imageUrl); 
    }
  }, [imageUrl]); 

  return (
    <>
      {/* App Header */}
      <div className="text-2xl font-bold p-4 text-left text-[#004d38]">Xz</div>

      {/* Cover Image + Profile Image */}
      <div className="relative h-48 bg-gray-200">
        {/* Cover Image */}
        <img
          src={cover}
          alt="Cover"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setImageToUpdate('cover')} // Set cover image for upload
        />

        {/* Profile Image */}
        <img
          src={profile}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12 cursor-pointer"
          onClick={() => setImageToUpdate('profile')} // Set profile image for upload
        />

        {/* Conditional UploadWidget */}
        {isOwnProfile && imageToUpdate && (
          <UploadWidget
            uwConfig={{
              cloudName: "dulbqtdar",
              uploadPreset: "trutur",
              multiple: false,
              maxImageFileSize: 500000,
              folder: "profiles"
            }}
            setImgUrl={setImgUrl} 
          />
        )}
      </div>

      {/* Username */}
      <div className="text-center mt-16 text-xl font-semibold">{user.username}</div>

      {/* Business Verification or Info */}
      {business ? (
        <div className="bg-[#004d38] p-4 mt-4 mx-4 rounded text-white">
          <p><strong>Address:</strong> {business.address}</p>
          <p><strong>Description:</strong> {business.description}</p>
          <p><strong>Contact:</strong> {business.phone}</p>
        </div>
      ) : (
        isOwnProfile && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate('/business')}
              className="bg-[#004d38] text-white px-4 py-2 rounded-full text-sm"
            >
              Verify Business
            </button>
          </div>
        )
      )}
    </>
  );
}
