import express from "express";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getPostsByBusiness,
  likePost,
  getAllPosts,
  commentPost,
  getComments
} from "../controllers/post.controller.js";
import {verifyToken} from "../middleware/authenticateUser.js"

const router = express.Router();

router.post("/",verifyToken, createPost); 
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/business/:id", getPostsByBusiness); 
router.put("/:postId/like",verifyToken, likePost); 
router.get("/",getAllPosts);
router.post("/:id/comment",commentPost);
router.get('/comments/:postId', getComments);

export default router; 
