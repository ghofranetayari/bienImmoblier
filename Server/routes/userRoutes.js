// userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { registerUser, authUser } from '../controllers/userController.js';
import { upload } from '../middleware/uploadMiddleware.js'; // Make sure to import correctly

const router = express.Router();

router.post('/register', upload.single('photo'), registerUser);
router.post('/login', authUser);

// Route pour obtenir le profil de l'utilisateur connecté
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-motDePasse');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route pour obtenir tous les utilisateurs sauf l'utilisateur connecté
router.get('/users', protect, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
