import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cssApp/SignUp.css';
import loginImage from '../images1/Login.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        dateNaissance: '',
        email: '',
        motDePasse: '',
        adresse: '',
        experienceProfessionnelle: '',
        motivation: ''
    });
    const [photo, setPhoto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach(key => form.append(key, formData[key]));
        form.append('photo', photo); // Utilisez la variable photo

        try {
            const response = await axios.post('/api/users/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            console.log('Réponse du serveur :', response.data);
            handleShowModal('Inscription réussie !');
            
            // Redirection vers la page Home2 après 2 secondes
            setTimeout(() => {
                navigate('/Home2');
            }, 2000);
            
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            console.error('Détails de l\'erreur :', error.response?.data);
            if (error.response?.data.message) {
                handleShowModal(error.response.data.message);
            } else {
                handleShowModal('Utilisateur déjà existant avec cet email');
            }
        }
    };

    return (
        <div className="signUp-container">
            <div className="signUp-box">
                <div className="signUp-left">
                    <h2>Bienvenue,</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Nom"
                            required
                        />
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="Prénom"
                            required
                        />
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Numéro de téléphone"
                            required
                        />
                        <input
                            type="date"
                            name="dateNaissance"
                            value={formData.dateNaissance}
                            onChange={handleChange}
                            placeholder="Date de naissance"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            name="motDePasse"
                            value={formData.motDePasse}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            required
                        />
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            placeholder="Adresse"
                            required
                        />
                        <textarea
                            name="experienceProfessionnelle"
                            value={formData.experienceProfessionnelle}
                            onChange={handleChange}
                            placeholder="Expérience professionnelle"
                            rows="4"
                            required
                        ></textarea>
                        <textarea
                            name="motivation"
                            value={formData.motivation}
                            onChange={handleChange}
                            placeholder="Motivation pour le poste"
                            rows="4"
                            required
                        ></textarea>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            required
                        />
                        <button type="submit" className="sign-up-button">S'INSCRIRE</button>
                    </form>
                </div>
                <div className="signUp-right">
                    <h2>Nouveau ici ?</h2>
                    <p>Inscrivez-vous et découvrez de nombreuses nouvelles opportunités !</p>
                    <button className="login-button">Se connecter</button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SignUp;
