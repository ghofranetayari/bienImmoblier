import Ticket from '../models/Ticket.js';

// Créer un ticket
export const createTicket = async (req, res) => {
    const { category, priority, description, clientId, contactDetails } = req.body;
    const teleoperateurId = req.user.id; // Id du téléopérateur connecté

    try {
        const newTicket = new Ticket({
            category,
            priority,
            description,
            clientId,
            contactDetails,
            teleoperateurId
        });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtenir les tickets du téléopérateur connecté
export const getTickets = async (req, res) => {
    const teleoperateurId = req.user.id;

    try {
        const tickets = await Ticket.find({ teleoperateurId }).populate('teleoperateurId', 'nom prenom');
        res.json(tickets);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Obtenir un ticket spécifique
export const getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id).populate('teleoperateurId', 'nom prenom');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket non trouvé' });
        }
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Mettre à jour un ticket
export const updateTicket = async (req, res) => {
    const { id } = req.params; // Récupère l'ID du ticket depuis les paramètres de la requête
    const { category, priority, description, clientId, contactDetails, status } = req.body;

    try {
        // Trouver le ticket par ID et mettre à jour les champs
        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            { category, priority, description, clientId, contactDetails, status },
            { new: true } // Retourne le ticket mis à jour
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Supprimer un ticket
export const deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket non trouvé' });
        }

        res.json({ message: 'Ticket supprimé avec succès' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};