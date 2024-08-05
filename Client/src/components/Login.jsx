import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../cssApp/Login.css';
import loginImage from '../images1/Login.png';
import Navbar from './Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, motDePasse: password });
            console.log('Réponse du serveur :', response.data);
            localStorage.setItem('accessToken', response.data.token); // Assurez-vous que le token est stocké sous la clé 'accessToken'
            localStorage.setItem('userInfo', JSON.stringify(response.data)); // Stockez les autres informations utilisateur
            navigate('/home2'); // Rediriger vers la page home2 après la connexion
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <div className="login-left">
                        <h1>Welcome back,</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="EMAIL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {error && <p className="error-message">{error}</p>}
                            <a href="#" className="forgot-password">Forgot password?</a>
                            <button type="submit" className="sign-in-button">SIGN IN</button>
                            <button type="button" className="facebook-button">Connect with <span>facebook</span></button>
                        </form>
                    </div>
                    <div className="login-right">
                        <h2>New here?</h2>
                        <p>Sign up and discover great amount of new opportunities!</p>
                        <button className="sign-up-button">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
