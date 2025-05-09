import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { AuthContext } from '../context/AuthContext';

export default function MessageList() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!currentUser?._id) return;
      try {
        const res = await newRequest.get(`/conversations/${currentUser._id}`);
        const receiverIds = res.data.map((conv) =>
          conv.members.find((id) => id !== currentUser._id)
        );

        const userPromises = receiverIds.map((id) =>
          newRequest.get(`/users/${id}`)
        );

        const userResponses = await Promise.all(userPromises);
        setContacts(userResponses.map((res) => res.data));
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };

    fetchContacts();
  }, [currentUser]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return setSearchResults([]);
      try {
        const res = await newRequest.get(`/search/users?search=${query}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    };

    fetchSearch();
  }, [query]);

  const goToProfile = (userId) => navigate(`/profile/${userId}`);
  const goToChat = (userId) => navigate(`/profile/${userId}/chats`);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 📌 Heading */}
      <h1 className="text-2xl font-bold text-center mb-4">Your Chats</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full p-3 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400 bg-[#004d38] text-white"
      />

      {/* 🔎 Search Results */}
      {query && searchResults.length > 0 && (
        <div className="absolute mt-2 w-full max-w-md bg-white shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
          {searchResults.map((user) => (
            <div
              key={user._id}
              onClick={() => goToProfile(user._id)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={user.profilePic || '/default-avatar.png'}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="font-medium text-sm">{user.username}</span>
            </div>
          ))}
        </div>
      )}

      {/* 👥 Contacted Users */}
      <div className="mt-6 space-y-4">
        {contacts.length > 0 ? (
          contacts.map((user) => (
            <div
              key={user._id}
              onClick={() => goToChat(user._id)}
              className="flex items-center p-3 rounded-lg border hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={user.profilePic || '/default-avatar.png'}
                alt="user"
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-base font-medium">
                  {user.name || user.username}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No conversations yet.</p>
        )}
      </div>
    </div>
  );
}
