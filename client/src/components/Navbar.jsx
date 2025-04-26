import React from 'react';
import { Home, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="w-full max-w-mbg-[#004d38]d  text-white shadow-lg">
        <div className="flex justify-around items-center h-12">
          {/* Home Icon */}
          <button className="flex flex-col items-center justify-center">
            <Home className="w-6 h-6 text-black" />
          </button>

          {/* User Icon */}
          <button className="flex flex-col items-center justify-center">
            <User className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}


