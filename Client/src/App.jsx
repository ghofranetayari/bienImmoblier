import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from './components/Login';
import About from './components/About';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile'; // Assuming Profile component is defined
import Home2 from './components/Home2'; // Nouvelle page
import Chat from './components/Chat'; // Nouvelle page
import TicketForm from './components/Ticket/TicketForm'; // Assurez-vous que le chemin est correct
import TicketList from './components/Ticket/TicketList';

const currentUser = {
  _id: 'currentUserId', // Remplacez par l'ID réel de l'utilisateur connecté
  nom: 'Nom',
  prenom: 'Prénom',
};
function App() {
  const userInfo = localStorage.getItem('userInfo');

  return (
    
    <>

      <Navbar /> {/* Utilisation de Navbar, suppression de NewNavbar */}
      <Routes>
        
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/home2" element={<ProtectedRoute><Home2 /></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><Chat currentUser={currentUser} /></ProtectedRoute>} />
        <Route path='/ticket' element={<ProtectedRoute><TicketForm /></ProtectedRoute>} />
        <Route path='/ticketList' element={<ProtectedRoute><TicketList/></ProtectedRoute>} />


      </Routes>
          </>

  );
}

export default App;
