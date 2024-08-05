import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'En cours'
    },
    teleoperateurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assurez-vous que 'User' est le nom de votre modèle pour les téléopérateurs
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
