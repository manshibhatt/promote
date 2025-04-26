import express from "express";
import {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getPostsByBusiness,
  likePost,
  getAllPosts
} from "../controllers/post.controller.js";
import {verifyToken} from "../middleware/authenticateUser.js"

const router = express.Router();

router.post("/",verifyToken, createPost); 
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/business/:businessId", getPostsByBusiness); 
router.patch("/:id/like", likePost);
router.get("/",getAllPosts);

export default router; 
