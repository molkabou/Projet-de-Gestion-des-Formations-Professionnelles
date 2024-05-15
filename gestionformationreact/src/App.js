
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import CreateFormation from './components/CreateFormation';
import UpdateFormation from './components/UpdateFormation';
import FormateursList from './components/FormateursList'; 
import CreateFormateur from './components/CreateFormateur';
import UpdateFormateur from './components/UpdateFormateur'; 
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/navbar';


function App() {
  const handleRegister = (userData) => {
    // Logique pour envoyer les données d'inscription au serveur
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Inscription réussie !');
        // Redirection ou affichage d'un message de succès
      } else {
        console.error('Échec de l\'inscription');
        // Gérer les erreurs d'inscription
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  };

  const handleLogin = (userData) => {
    // Logique pour envoyer les données de connexion au serveur
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Connexion réussie !');
        // Redirection ou affichage d'un message de succès
      } else {
        console.error('Échec de la connexion');
        // Gérer les erreurs de connexion
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
    //Redirection si l'inscription réussie
    // window.location.href = '/blog';
    

  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> {/* Render the Navbar component */}
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/create-formation" element={<CreateFormation />} />
          <Route path="/update/:id" element={<UpdateFormation />} />
          <Route path="/listformateur" element={<FormateursList />} /> 
          <Route path="/createformateur" element={<CreateFormateur />} />
          <Route path="/updateformateur/:id" element={<UpdateFormateur />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
