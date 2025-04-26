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


export const getPostsByBusiness = async (req, res, next) => {
  try {
    const posts = await Post.find({ businessId: req.params.businessId });
    res.status(200).json(posts);
  } catch (err) {
    next(createError(500, "Failed to fetch posts"));
  }
};


export const likePost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return next(createError(404, "Post not found"));
  
      if (post.likes.includes(req.userId)) {
        // Unlike
        post.likes.pull(req.userId);
      } else {
        // Like
        post.likes.push(req.userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Post like status updated", likes: post.likes.length });
    } catch (err) {
      next(createError(500, "Failed to update likes"));
    }
  }; 

  export const getAllPosts = async (req, res, next) => {
    try {
      const { userId } = req.params; 
      const posts = await Post.find({ userId }).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      next(createError(500, "Error fetching posts"));
    }
  };   
  
  
