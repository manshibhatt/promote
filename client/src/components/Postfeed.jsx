

import { UserCircle, MessageSquare, Share2, Heart } from 'lucide-react';
import newRequest from '../utils/newRequest';
import { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { AuthContext } from '../context/AuthContext';

export default function PostFeed({ posts, onToggleLike }) { 
  // const [posts, setPosts] = useState([]);
  const [commentStates, setCommentStates] = useState({}); 

  const { currentUser } = useContext(AuthContext);

  const userId = currentUser?._id; 
  

  // useEffect(() => {
  //   const fetchPosts = async () => { 
  //     try {
  //       const res = await newRequest.get("/posts/");
  //       setPosts(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch posts:", err);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // const toggleLike = async (postId) => {
  //   // console.log("button");
  //   try {
  //     const res = await newRequest.put(`/posts/${postId}/like`); 
  //     // console.log(res.data)
  //     setPosts(posts.map(post => 
  //       post._id === postId ? { ...post, likes: res.data.likes } : post
  //     ));
  //   } catch (err) {
  //     console.error("Like error:", err);
  //   }
  // };

  const toggleCommentBox = (postId) => {
    setCommentStates(prev => ({
      ...prev,
      [postId]: { ...prev[postId], open: !prev[postId]?.open, comments: prev[postId]?.comments || [] }
    }));

    if (!commentStates[postId]?.comments?.length) {
      fetchComments(postId);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await newRequest.get(`/posts/comments/${postId}`);
      setCommentStates(prev => ({
        ...prev,
        [postId]: { ...prev[postId], comments: res.data }
      }));
    } catch (err) {
      console.error("Comment fetch error:", err);
    }
  };

  const handlePostComment = async (postId, commentText) => {
    try {
      const res = await newRequest.post(`/posts/${postId}/comment`, {
        userId,
        text: commentText,
      });
      fetchComments(postId);
    } catch (err) {
      console.error("Post comment error:", err);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 no-scrollbar">
      {Array.isArray(posts) && posts.map((post, index) => {
      const liked = Array.isArray(post.likes) && post.likes.some(id => id && id.toString() === userId);


        const commentsOpen = commentStates[post._id]?.open;

        return (
          <div key={index} className="bg-white rounded-xl shadow-md p-4">
            {/* User Info */}
            <div className="flex items-center mb-2">
              <img
                src={post.userId.profilePic}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link to={`/profile/${post.userId._id}`} className="ml-2 font-semibold text-gray-800 hover:underline">
                {post.userId.username || "User"}
              </Link>
            </div>

            {/* Post Description */}
            <p className="text-gray-700 mb-3">{post.description}</p>

            {/* Post Images */}
            {Array.isArray(post.image) && post.image.length > 0 && (
              <div className="flex overflow-x-auto gap-2 mb-3">
                {post.image.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`Post image ${i + 1}`}
                    className="h-40 rounded-md object-cover"
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-around mt-2">
              <button
                onClick={() => onToggleLike(post._id)}
                className={clsx("flex items-center gap-1 px-3 py-1 rounded-md text-sm", {
                  "bg-gray-600 text-white": liked,
                  "bg-[#004d38] text-white": !liked,
                })}
              >
                <Heart className="w-4 h-4" />
                {liked ? "Liked" : "Like"}
              </button>

              <button
                onClick={() => toggleCommentBox(post._id)}
                className="flex items-center gap-1 text-white bg-[#004d38] px-3 py-1 rounded-md text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Comment
              </button>

              <button className="flex items-center gap-1 text-white bg-[#004d38] px-3 py-1 rounded-md text-sm">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Comment Section */}
            {commentsOpen && (
              <div className="mt-4 bg-gray-100 rounded-md p-3 shadow-inner transition-all">
                <ul className="space-y-2 mb-2 max-h-40 overflow-y-auto pr-2">
                  {commentStates[post._id]?.comments?.map((c, idx) => (
                    <li key={idx} className="text-sm text-gray-800">
                      <span className="font-medium">{c.userId.username}:</span> {c.text}
                    </li>
                  ))}
                </ul>
                <CommentInput onSubmit={(text) => handlePostComment(post._id, text)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CommentInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-1 rounded-l-md border border-gray-300 text-sm focus:outline-none"
      />
      <button type="submit" className="bg-[#004d38] text-white px-4 rounded-r-md text-sm">
        Post
      </button>
    </form>
  );
} 