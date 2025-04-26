import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import PostFeed from '../components/Postfeed';
import SidebarMenu from '../components/SidebarMenu';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex justify-center bg-white h-screen overflow-hidden">
      <div className="w-full max-w-md flex flex-col relative">
        {/* Top Section */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold text-black">XYZ</h1>
            <Menu
              className="w-6 h-6 text-black cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm"
            />
            <Search className="w-5 h-5 text-gray-500 ml-2" />
          </div>
        </div>

        {/* Scrollable Posts */}
        <PostFeed />

     
      </div>

      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}

