import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../cssApp/TicketForm.css'; // Assume you have some global styles here

function TicketForm() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/categories');
                setCategories(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des catégories:', err);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!category || !priority || !description || !clientId || !contactDetails) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        const token = localStorage.getItem('accessToken'); // Récupère le token depuis le localStorage

        if (!token) {
            setError('Vous devez être connecté pour soumettre un ticket');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/tickets', {
                category,
                priority,
                description,
                clientId,
                contactDetails,
                status: 'En cours'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Ajoute le token dans les en-têtes
                }
            });

            setCategory('');
            setPriority('');
            setDescription('');
            setClientId('');
            setContactDetails('');

            alert('Ticket soumis avec succès!');
            navigate('/home2'); // Redirection après soumission réussie
        } catch (err) {
            console.error('Erreur lors de la soumission du ticket:', err);
            setError('Échec de la soumission du ticket');
        }
    };

    return (
        <div className="ticket-form">
            <h2>Soumettre un Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="clientId">ID Client:</label>
                    <input
                        type="text"
                        id="clientId"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        placeholder="Entrez l'ID client"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactDetails">Coordonnées de Contact:</label>
                    <input
                        type="text"
                        id="contactDetails"
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                        placeholder="Entrez l'email ou le numéro de téléphone"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Catégorie:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                        <option value="facturation">Facturation</option>
                        <option value="gestion-compte">Gestion de compte</option>
                        <option value="demande-support">Demande de support</option>
                        <option value="probleme-technique">Problème technique</option>
                        <option value="autres">Autres</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priorité:</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Sélectionnez une priorité</option>
                        <option value="basse">Basse</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="haute">Haute</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description détaillée:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrez une description détaillée"
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="submit-button">
                    Soumettre
                </button>
            </form>
        </div>
    );
}

export default TicketForm;
