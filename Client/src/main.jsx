import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importer BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import { ToastContainer } from 'react-toastify'; // Importer ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importer le CSS de Toastify

import App from './App'; // Assurez-vous que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
    <ToastContainer autoClose={2000} /> {/* Ajouter ToastContainer ici */}
  </BrowserRouter>
);
