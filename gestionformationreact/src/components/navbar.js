import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './css.css'


const Navbar = () => {
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    // Simulate fetching user role and login status from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert token to boolean
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage upon logout
    localStorage.removeItem('token');
    // Update login status
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {isLoggedIn &&
        <Link className="navbar-link" to="/blog">
          <i className="fas fa-list"></i> Liste des formations
        </Link>
        }

        {isLoggedIn && (userRole === 'admin' || userRole === 'RH') && (
        <Link className="navbar-link" to="/createformateur">
          <i className="fas fa-user-plus"></i> Créer Formateur
        </Link>
        )}

        {isLoggedIn && (userRole === 'admin' || userRole === 'RH') && (

        <Link className="navbar-link" to="/listformateur">
          <i className="fas fa-users"></i> Liste des formateurs
        </Link>
        )}
        
        {isLoggedIn && (userRole === 'admin' || userRole === 'responsable') && (
        <Link className="navbar-link" to="/blog/create-formation">
          <i className="fas fa-plus"></i> Créer Formation
        </Link>
        )}

        <Link className="navbar-link" to="/login" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt">  connexion</i> 
        </Link>

        {!isLoggedIn && (
          <Link className="navbar-link" to="/login">
            <i className="fas fa-sign-in-alt">  deconnexion
            </i>
          </Link>
        )}

      </div>
    </nav>
  );  
};

export default Navbar;
