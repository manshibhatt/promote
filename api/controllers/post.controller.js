import Post from "../models/post.model.js";
import createError from "../utils/createError.js";


export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post({
      ...req.body,
      userId: req.userId, 
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.log(err);
    next(createError(500, "Failed to create post"));
  }
};


export const getPostById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const post = await Post.findOne({ userId });
    if (!post) return next(createError(404, "Post not found"));
    res.status(200).json(post);
  } catch (err) {
    console.log(err)
    next(createError(500, "Error fetching post"));
  }
};


export const updatePost = async (req, res, next) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return next(createError(404, "Post not found"));
    res.status(200).json({ message: "Post updated", post: updated });
  } catch (err) {
    next(createError(500, "Failed to update post"));
  }
};


export const deletePost = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Post not found"));
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(createError(500, "Failed to delete post"));
  }
};



export const likePost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);
      console.log("User from token:", req.userId);
console.log("Post ID:", req.params.postId);

      if (!post) return next(createError(404, "Post not found"));

      
  
      if (post.likes.includes(req.userId)) {
        // Unlike
        post.likes.pull(req.userId);
      } else {
        // Like
        post.likes.push(req.userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Post like status updated", likes: post.likes });
    } catch (err) {
      console.log(err)
      next(createError(500, "Failed to update likes"));
    }
  }; 

  export const getAllPosts = async (req, res, next) => {
    try {
      const posts = await Post.find()
      .populate("userId", "username profilePic")
      .populate("comments.userId", "username")
      .sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      next(createError(500, "Error fetching posts"));
    }
  };   
  
  
  export const getPostsByBusiness = async (req, res, next) => {
    try {
      const userId  = req.params.id; 
      const posts = await Post.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      next(createError(500, "Error fetching posts"));
    }
  };



export const commentPost = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const comment = { userId, text, createdAt: new Date() };
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    ).populate("comments.userId", "username");

    res.status(200).json(post.comments);
  } catch (err) { 
    res.status(500).json({ message: "Error commenting on post", err });
  }
};

export const getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
      .select('comments') // Only retrieve comments
      .populate('comments.userId', 'username profilePic'); // Populate user info for comments

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (err) {
    console.log(err);
    next(createError(500, 'Error fetching comments'));
  }
};
