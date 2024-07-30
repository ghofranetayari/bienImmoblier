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

function App() {
  const userInfo = localStorage.getItem('userInfo');

  return (
    <BrowserRouter>
      <Navbar /> {/* Utilisation de Navbar, suppression de NewNavbar */}
      <Routes>
        
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/home2" element={<ProtectedRoute><Home2 /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
