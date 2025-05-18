import React, { useState } from 'react';
import UploadWidget from '../components/UploadWidget';
import newRequest from '../utils/newRequest';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function CreatePost() { 
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 
  const [location, setLocation] = useState(''); 
  const navigate=useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleCreatePost=async(user)=>{ 
        try{
          // console.log("click")
          // console.log(user)
          const response= await newRequest.post("/posts/",{
            userId:user?._id,
            description,
            tags,
            image:imageUrl,
            location
          }) 
          // console.log(response.data);
          navigate(`/profile/${user?._id}`);

        }catch(error){
           console.log('Error uploading image', error);
        }
  }


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>

      <label className="block mb-2 text-sm font-medium">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Write your post description..."
        rows={3}
      />

      <label className="block mb-2 text-sm font-medium">Tags</label>
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="e.g. tech, design"
      />

      <label className="block mb-2 text-sm font-medium">Location</label>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Enter location (e.g. Delhi, Mumbai)"
      />

        <UploadWidget
               uwConfig={{
                 cloudName: "dulbqtdar",
                 uploadPreset: "trutur",
                 multiple: false,
                 maxImageFileSize: 500000,
                 folder: "profiles"
               }}
               setImgUrl={setImageUrl} 
             />

      {/* Show uploaded image preview if available */}
      {imageUrl && (
        <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />
      )}

      <button
        onClick={() => handleCreatePost(currentUser)}
        className="w-full bg-[#004d38] hover:bg-[#003727] text-white py-2 rounded"
      >
        Create
      </button> 
    </div>
  );
}

