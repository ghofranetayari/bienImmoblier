import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', upload.single('photo'), registerUser);
router.post('/login', authUser);

// GET user profile route
router.get('/profile', protect, async (req, res) => {
    try {
        // Fetch user profile based on authenticated user's ID
        const user = await User.findById(req.user.id).select('-motDePasse');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
