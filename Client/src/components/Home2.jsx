import React from 'react';
import Navbar from './Navbar'; // Assurez-vous que le chemin est correct

const Home2 = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: 250, padding: 20 , marginTop: 60  }}>
        <h1>Bienvenue sur la nouvelle page</h1>
        <p>Ceci est une page vide avec une autre barre de navigation.</p>
      </div>
    </div>
  );
};

export default Home2;
