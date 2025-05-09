import { useState, useEffect } from "react";
import { Search } from "lucide-react"; 
import newRequest from "../utils/newRequest";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchPosts = async () => {
      try {
        const res = await newRequest.get("/api/search/posts", {
          params: { q: debouncedQuery },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Search error", err);
      }
    };

    fetchPosts();
  }, [debouncedQuery]);

  return (
    <div>
      <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="w-5 h-5 text-gray-500 ml-2" />
      </div>
    </div>
  );
}
