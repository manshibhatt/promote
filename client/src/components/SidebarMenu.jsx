import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SidebarMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {/* Transparent overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={onClose}
        />
      )}

      {/* Side panel */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 md:w-1/4 bg-[#004d38] z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center gap-6 text-lg text-white">
          {currentUser ? (
            <button
              onClick={() => navigate(`/profile/${currentUser?._id}`)}
              className="text-left"
            >
              My Profile
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-left"
            >
              Login
            </button>
          )}

          <button className="text-left" onClick={() => navigate('/messages')}>Messages</button>
          <button className="text-left">My Address</button>
          <button className="text-left">My Bookings</button>
        </div>
      </div>
    </>
  );
}

