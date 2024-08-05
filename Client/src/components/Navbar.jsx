import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssApp/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false); // État pour gérer l'authentification
    const [userPhoto, setUserPhoto] = useState(null); // État pour stocker la photo de l'utilisateur
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken'); // Supprimer le token d'accès
        setAuthenticated(false); // Mettre à jour l'état d'authentification
        navigate('/login'); // Rediriger vers la page de login
        console.clear(); // Effacer la console pour protéger les informations utilisateur
    };

    // Vérifier l'authentification à partir des informations utilisateur
    useEffect(() => {
        if (userInfo && userInfo.token) {
            setAuthenticated(true); // Mettre à jour l'état d'authentification si l'utilisateur est connecté
            setUserPhoto(userInfo.photo); // Mettre à jour la photo de l'utilisateur
        }
    }, [userInfo]);

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/" className='navbar-brand'>OTLOB DAR</Link>
            </div>
            <div className='navbar-right'>
                {authenticated ? (
                    <>
                        <Link to="/profile" className='navbar-link'>
                            {userPhoto ? (
                                <img src={userPhoto} alt="Profile" className="profile-photo" />
                            ) : (
                                'Profile'
                            )}
                        </Link>
                        <Link to="/chat" className='navbar-link'>Chat</Link> {/* Lien vers le Chat */}
                        <Link to="/ticket" className='navbar-link'>Ticket</Link> 
                        <Link to="/ticketList" className='navbar-link'>TicketList</Link> 

                        <button onClick={handleLogout} className='navbar-link'>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/about" className='navbar-link'>About</Link>
                        <Link to="/login" className='navbar-link'>SignIn</Link>
                        <Link to="/signUp" className='navbar-link'>SignUp</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
