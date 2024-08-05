import Message from '../models/Message.js';

// Contrôleur pour obtenir tous les messages d'une conversation
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Contrôleur pour envoyer un message
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, text } = req.body;

        if (!conversationId || !text) {
            return res.status(400).json({ message: 'Conversation ID and message text are required' });
        }

        const message = new Message({
            conversationId,
            sender: req.user._id,
            text,
            timestamp: new Date(),
        });

        await message.save();
        // Emit le message à tous les clients connectés dans la même conversation
        req.io.to(conversationId).emit('receiveMessage', message);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
