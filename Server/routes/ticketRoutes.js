// routes/ticketRoutes.js
import express from 'express';
import { createTicket, deleteTicket, getTicketById, getTickets, updateTicket } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js'; // Utilisez des accolades pour l'export nommé

const router = express.Router();

// Créer un ticket
router.post('/', protect, createTicket); // Remplacez `authMiddleware` par `protect`

// Obtenir les tickets du téléopérateur connecté
router.get('/', protect, getTickets); // Remplacez `authMiddleware` par `protect`

// Obtenir un ticket spécifique par ID
router.get('/:id', protect, getTicketById);

// Mettre à jour un ticket
router.put('/:id', protect, updateTicket); // Route PUT pour mettre à jour un ticket

// Supprimer un ticket
router.delete('/:id', protect, deleteTicket); 
export default router;
