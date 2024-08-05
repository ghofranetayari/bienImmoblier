import express from 'express';
import { createConversation, getConversationMessages, getConversations } from '../controllers/conversationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createConversation).get(protect, getConversations);
router.route('/:id/messages').get(protect, getConversationMessages);

export default router;
