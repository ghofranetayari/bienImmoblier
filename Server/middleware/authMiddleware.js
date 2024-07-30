// authMiddleware.js
//authMiddleware.js: Ce fichier contient le middleware protect, qui vérifie si l'utilisateur est authentifié
// avant de lui permettre d'accéder à certaines routes, comme la route GET /profile.

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// authMiddleware.js
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('Token reçu :', token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-motDePasse');
            console.log('Utilisateur trouvé :', req.user);
            next();
        } catch (error) {
            console.error('Erreur lors de la vérification du token :', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export { protect };
