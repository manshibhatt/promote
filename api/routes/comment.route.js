import express from "express";
import {
  createComment,
  getCommentsByPostId,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// Create a comment on a post
router.post("/", createComment);

// Get all comments for a specific post
router.get("/post/:postId", getCommentsByPostId);

// Delete a comment by its ID
router.delete("/:id", deleteComment);

export default router;
