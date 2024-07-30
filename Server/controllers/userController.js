import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Fonction pour générer un token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Fonction pour enregistrer un utilisateur
const registerUser = async (req, res, next) => {
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Erreurs de validation:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extraction des données de la requête
        const { nom, prenom, telephone, dateNaissance, email, motDePasse, adresse, experienceProfessionnelle, motivation } = req.body;

        console.log('Tentative d\'inscription avec les données suivantes :', req.body);

        // Vérification si un utilisateur avec cet email existe déjà
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('Erreur : Utilisateur déjà existant avec cet email.');
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Création d'un nouvel utilisateur
        const user = await User.create({
            nom,
            prenom,
            telephone,
            dateNaissance,
            email,
            motDePasse,
            adresse,
            experienceProfessionnelle,
            motivation,
            photo: req.file ? `/uploads/${req.file.filename}` : null // Ajouter la photo si elle existe
        });

        console.log('Utilisateur enregistré avec succès :', user);

        // Génération d'un token JWT pour l'utilisateur
        const token = generateToken(user._id);

        // Envoi de la réponse avec les détails de l'utilisateur et le token
        res.status(201).json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            token,
            photo: user.photo
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const authUser = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(motDePasse))) {
            const token = generateToken(user._id);

            res.json({
                _id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { registerUser, authUser };
