// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap importé avant ton CSS personnalisé

import '../cssApp/Navbar.css';


const Navbar = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const authenticated = userInfo && userInfo.token;
    const userPhoto = userInfo ? userInfo.photo : null;

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accessToken');
        setAuthenticated(false); // Mettre à jour l'état d'authentification

        window.location.href = '/login'; // Redirect manually for simplicity
    };

    return (
        <nav className="navbar">
    <div className="navbar-left">
        <Link to="/" className="navbar-brand">OTLOB DAR</Link>
    </div>
    <div className="navbar-right">
        {authenticated ? (
            <>
                <Link to="/profile" className="navbar-link">
                    {userPhoto ? (
                        <img src={userPhoto} alt="Profile" className="profile-photo" />
                    ) : (
                        'Profile'
                    )}
                </Link>
                <button onClick={handleLogout} className="navbar-link">Logout</button>
            </>
        ) : (
            <>
                <Link to="/" className='navbar-link'></Link>
                <Link to="/about" className="navbar-link">About</Link>
                <Link to="/login" className="navbar-link">SignIn</Link>
                <Link to="/signUp" className="navbar-link">SignUp</Link>
            </>
        )}
    </div>
</nav>

    );
};

export default Navbar;
