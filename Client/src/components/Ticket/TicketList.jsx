import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../cssApp/TicketList.css';
import TicketForm from './TicketForm';
import UpdateTicketModal from './UpdateTicketModal';
import { toast } from 'react-toastify';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [ticketToUpdate, setTicketToUpdate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(10);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:3001/api/tickets', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTickets(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des tickets:', err);
                setError('Erreur lors de la récupération des tickets. Veuillez réessayer plus tard.');
            }
        };

        fetchTickets();
    }, []);

    const calculateElapsedTime = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const elapsed = now - createdDate;

        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} jour(s)`;
        } else if (hours > 0) {
            return `${hours} heure(s)`;
        } else if (minutes > 0) {
            return `${minutes} minute(s)`;
        } else {
            return `${seconds} seconde(s)`;
        }
    };

    const handleDelete = async (ticketId) => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:3001/api/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
            toast.success('Ticket supprimé avec succès');
        } catch (err) {
            console.error('Erreur lors de la suppression du ticket:', err);
            setError('Erreur lors de la suppression du ticket. Veuillez réessayer plus tard.');
        }
    };

    const handleUpdate = async (ticketId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:3001/api/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTicketToUpdate(response.data);
            setShowUpdateForm(true);
        } catch (err) {
            console.error('Erreur lors de la récupération du ticket:', err);
            setError('Erreur lors de la récupération du ticket. Veuillez réessayer plus tard.');
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setShowUpdateForm(false);
    };

    const handleModalClose = () => {
        setShowUpdateForm(false);
        setTicketToUpdate(null);
    };

    const handleTicketUpdate = (updatedTicket) => {
        setTickets(tickets.map(ticket => ticket._id === updatedTicket._id ? updatedTicket : ticket));
    };

    // Pagination logic
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
    const totalPages = Math.ceil(tickets.length / ticketsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Liste des Tickets</h2>
            <div className="d-flex justify-content-start mb-3">
                <button
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={toggleForm}
                >
                    {showForm ? 'Retour à la Liste des Tickets' : 'Ajouter un Ticket'}
                </button>
            </div>
            {showForm ? (
                <TicketForm onFormSubmit={() => setShowForm(false)} />
            ) : (
                <>
                    {error && <p className="text-danger">{error}</p>}
                    {currentTickets.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">IDTicket</th>
                                        <th scope="col">Téléopérateur</th>
                                        <th scope="col">Client ID</th>
                                        <th scope="col">Catégorie</th>
                                        <th scope="col">Priorité</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Coordonnées</th>
                                        <th scope="col">Statut</th>
                                        <th scope="col">Date de Création</th>
                                        <th scope="col">Temps Écoulé</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTickets.map(ticket => (
                                        <tr key={ticket._id}>
                                            <th scope="row">{ticket._id}</th>
                                            <td>{ticket.teleoperateurId.nom} {ticket.teleoperateurId.prenom}</td>
                                            <td>{ticket.clientId}</td>
                                            <td>{ticket.category}</td>
                                            <td>{ticket.priority}</td>
                                            <td>{ticket.description}</td>
                                            <td>{ticket.contactDetails}</td>
                                            <td>
                                                <span className={`badge ${ticket.status === 'Résolu' ? 'bg-success' : 'bg-warning'}`}>
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                                            <td>{calculateElapsedTime(ticket.createdAt)}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => handleUpdate(ticket._id)}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(ticket._id)}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Aucun ticket trouvé.</p>
                    )}
                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                    Précédent
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                    Suivant
                                </button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
            {showUpdateForm && (
                <UpdateTicketModal
                    ticket={ticketToUpdate}
                    onClose={handleModalClose}
                    onUpdate={handleTicketUpdate}
                />
            )}
        </div>
    );
};

export default TicketList;
