import express from 'express';
import {
  createConversation,
  getUserConversations,
  getConvo
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.post('/', createConversation);
router.get('/:userId', getUserConversations);
router.post("/access",getConvo);

export default router;  
