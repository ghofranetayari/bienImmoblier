import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../cssApp/Profile.css'; // Assure-toi que le chemin est correct

const Profile = () => {
    const [user, setUser] = useState(null);
    const [tokenFound, setTokenFound] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('accessToken');
            console.log('Token récupéré :', token);

            if (!token) {
                console.log('Token non trouvé. Redirection vers la page de connexion...');
                setTokenFound(false);
                setLoading(false);
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Données du profil :', response.data);
                setUser(response.data);
                setTokenFound(true);
            } catch (error) {
                console.error('Erreur lors de la récupération du profil :', error.response ? error.response.data : error.message);
                setTokenFound(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!tokenFound) {
        return <div>Token non trouvé. Veuillez vous connecter.</div>;
    }

    if (!user) {
        return <div>Informations de profil non disponibles.</div>;
    }

    const photoUrl = `http://localhost:5173/uploads/photo-1721767338247.jpg`; // Remplace avec le chemin de l'image test

    return (
        <div>
            <h1>Profil</h1>
            <img src={photoUrl} alt="Photo de profil" style={{ maxWidth: '200px', height: 'auto' }} />
            <p>Nom: {user.nom || 'Non disponible'}</p>
            <p>Prénom: {user.prenom || 'Non disponible'}</p>
            <p>Email: {user.email || 'Non disponible'}</p>
            <p>Téléphone: {user.telephone || 'Non disponible'}</p>
            <p>Adresse: {user.adresse || 'Non disponible'}</p>
            <p>Date de naissance: {user.dateNaissance || 'Non disponible'}</p>
        </div>
    );
};

export default Profile;
