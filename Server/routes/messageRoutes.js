import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// GET tous les messages pour une conversation
router.get('/:conversationId', protect, getMessages);

// POST pour envoyer un message
router.post('/', protect, sendMessage);

export default router;
