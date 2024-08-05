import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Créez le socket en dehors du composant pour éviter les multiples connexions
const socket = io('http://localhost:3001', {
    transports: ['websocket'],
    auth: {
        token: localStorage.getItem('accessToken'), // Utilisez le même nom que celui où vous stockez le token
    }
});

function Chat({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // Assurez-vous que le token est correct
        if (!token) {
            console.error('Token is missing');
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users/users');
                const filteredUsers = response.data.filter(user => user._id !== currentUser._id);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

        // Assurez-vous que les écouteurs de socket sont nettoyés correctement
        socket.on('newMessage', (msg) => {
            if (msg.conversationId === conversationId) {
                setMessages(prevMessages => [...prevMessages, msg]);
            }
        });

        return () => {
            socket.off('newMessage');
        };
    }, [currentUser, conversationId]);

    const handleSelectUser = async (user) => {
        setSelectedUser(user);

        try {
            // Créez ou récupérez la conversation existante
            const response = await axios.post('http://localhost:3001/api/conversations', {
                userId: currentUser._id,
                recipientId: user._id,
            });

            const newConversationId = response.data._id;
            setConversationId(newConversationId);

            // Récupérez les messages de la conversation
            const messagesResponse = await axios.get(`http://localhost:3001/api/conversations/${newConversationId}/messages`);
            setMessages(messagesResponse.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() && selectedUser && conversationId) {
            const msg = { to: selectedUser._id, text: message, conversationId };
            try {
                await axios.post('http://localhost:3001/api/messages', {
                    conversationId,
                    from: currentUser._id,
                    text: message,
                });

                socket.emit('sendMessage', msg);
                setMessages(prevMessages => [...prevMessages, msg]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
                <h3>Users</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {users.map(user => (
                        <button
                            key={user._id}
                            onClick={() => handleSelectUser(user)}
                            style={{
                                padding: '10px',
                                margin: '5px 0',
                                border: '1px solid #ccc',
                                backgroundColor: selectedUser?._id === user._id ? '#ddd' : '#fff'
                            }}
                        >
                            {user.nom} {user.prenom}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
                <div style={{ height: '400px', border: '1px solid #ccc', marginBottom: '10px', overflowY: 'scroll' }}>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.from || 'Unknown'}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    style={{ width: '80%', marginRight: '10px' }}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
