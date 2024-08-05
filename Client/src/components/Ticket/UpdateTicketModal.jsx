import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTicketModal = ({ ticket, onClose, onUpdate }) => {
    const [updatedTicket, setUpdatedTicket] = useState(ticket);
    const [categories, setCategories] = useState([]);
    const [priorities] = useState(['Basse', 'Moyenne', 'Haute']);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/categories');
                setCategories(response.data); // Set categories from API
            } catch (err) {
                console.error('Erreur lors de la récupération des catégories:', err);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTicket({ ...updatedTicket, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/tickets/${ticket._id}`, updatedTicket, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onUpdate(updatedTicket);
            onClose();
        } catch (err) {
            console.error('Erreur lors de la mise à jour du ticket:', err);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header" style={{ position: 'relative' }}>
                        <h5 className="modal-title">Mettre à jour le Ticket</h5>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={onClose}
                            style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'transparent' }}
                        >
                            <span aria-hidden="true" style={{ fontSize: '1.5rem', color: '#000' }}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Catégorie</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={updatedTicket.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une catégorie</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                    {/* Additional static options */}
                                    <option value="facturation">Facturation</option>
                                    <option value="gestion-compte">Gestion de compte</option>
                                    <option value="demande-support">Demande de support</option>
                                    <option value="probleme-technique">Problème technique</option>
                                    <option value="autres">Autres</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Priorité</label>
                                <select
                                    className="form-control"
                                    name="priority"
                                    value={updatedTicket.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une priorité</option>
                                    {priorities.map(p => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={updatedTicket.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Client ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="clientId"
                                    value={updatedTicket.clientId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Statut</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={updatedTicket.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="En cours">En cours</option>
                                    <option value="Résolu">Résolu</option>
                                    <option value="Fermé">Fermé</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Mettre à jour</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTicketModal;
