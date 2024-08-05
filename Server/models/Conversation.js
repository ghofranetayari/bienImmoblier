import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema({
    participants: [mongoose.Schema.Types.ObjectId], // Liste des utilisateurs participants à la conversation
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
