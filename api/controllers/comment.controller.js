import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({
      postId: req.params.postId,
      userId: req.userId,
      text: req.body.text,
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    next(createError(500, "Failed to add comment"));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate("userId", "username");
    res.status(200).json(comments);
  } catch (err) {
    next(createError(500, "Failed to fetch comments"));
  }
};

export const deleteComment = async (req, res, next) => {
    try {
      const deleted = await Comment.findByIdAndDelete(req.params.id);
      if (!deleted) return next(createError(404, "Comment not found"));
      res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
      next(createError(500, "Failed to delete comment"));
    }
};