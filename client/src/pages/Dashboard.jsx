import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import PostFeed from '../components/Postfeed';
import SidebarMenu from '../components/SidebarMenu';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import newRequest from '../utils/newRequest';

export default function Dashboard() { 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await newRequest.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  
const toggleLike = async (postId) => {
  try {
    const res = await newRequest.put(`/posts/${postId}/like`);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: res.data.likes } : post
      )
    );
  } catch (err) {
    console.error("Like error:", err);
  }
};

  const fetchSearchResults = async (q) => {
    try {
      const params = new URLSearchParams();
      // if (q) params.append('q', q);
      // if (location) params.append('location', location);
      // if (tag) params.append('tag', tag);

      const res = await newRequest.get(`/search/posts?${params.toString()}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), [location, tag]);

  
  useEffect(() => {
    if (query.trim() !== '') {
      debouncedSearch(query);
    } else if (location || tag) {
      fetchSearchResults('');
    } else {
      setSearchResults([]);
    }
  }, [query, debouncedSearch]);

  
  useEffect(() => {
    if (query.trim() !== '') {
      fetchSearchResults(query);
    } else if (location || tag) {
      fetchSearchResults('');
    }
  }, [location, tag]);

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Filter
              className="w-5 h-5 text-gray-500 ml-2 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>

          
          {showFilters && (
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tag"
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Posts Section */}
        <PostFeed posts={query.trim() || location || tag ? searchResults : posts} onToggleLike={toggleLike}/>
      </div>

      {/* Sidebar */}
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
