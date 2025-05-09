import express from 'express';
import { searchUser } from '../controllers/search.controller.js';
import { searchPost } from '../controllers/search.controller.js';

const router=express.Router();

router.get('/search/users', searchUser);
router.get("/search/posts",searchPost);

export default router;