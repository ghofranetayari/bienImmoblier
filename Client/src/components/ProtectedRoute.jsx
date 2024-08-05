import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    return <Navigate to="/login" />;
  }

  // Sinon, rendez l'enfant (la route protégée)
  return children;
};

export default ProtectedRoute;
