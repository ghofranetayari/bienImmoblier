// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users'); // Endpoint pour obtenir tous les utilisateurs
                setUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="sidebar">
            <h2>Utilisateurs</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id} onClick={() => onSelectUser(user)}>
                        {user.nom} {user.prenom}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
