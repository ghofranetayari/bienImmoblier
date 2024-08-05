// conversationController.js
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// Fonction pour créer une nouvelle conversation
export const createConversation = async (req, res) => {
    const { userId, recipientId } = req.body;

    try {
        const conversation = new Conversation({ participants: [userId, recipientId] });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la conversation' });
    }
};

// Fonction pour obtenir les messages d'une conversation
export const getConversationMessages = async (req, res) => {
    const { id } = req.params;

    try {
        const messages = await Message.find({ conversationId: id });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
    }
};

// Fonction pour obtenir les conversations d'un utilisateur
export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ participants: req.user._id });
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des conversations' });
    }
};
