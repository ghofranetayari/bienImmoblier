import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001', // Remplacez par l'URL de votre API backend
});

instance.interceptors.response.use(
    response => {
        console.log('Réponse Axios interceptée:', response);
        return response;
    },
    error => {
        console.error('Erreur Axios interceptée:', error);
        throw error; // Relancer l'erreur pour la gérer plus loin si nécessaire
    }
);

export default instance;
