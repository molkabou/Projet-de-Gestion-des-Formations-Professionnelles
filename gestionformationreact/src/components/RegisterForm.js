import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer les données d'inscription à l'API d'authentification
      await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
      alert('Inscription réussie !');

      // Réinitialiser les données du formulaire après une inscription réussie
      setUsername('');
      setPassword('');
      setRole('');
      window.location.href = '/blog';
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      alert('Une erreur s\'est produite lors de l\'inscription.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <div>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Sélectionner un rôle</option>
          <option value="responsable">Responsable</option>
          <option value="RH">RH</option>
          <option value="admin">Admin</option>
          <option value="employe">Employé</option>
        </select>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;
