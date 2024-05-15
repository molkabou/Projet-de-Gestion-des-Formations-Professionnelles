import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style.css";

const App = () => {
  const [formateurs, setFormateurs] = useState([]);

  useEffect(() => {
    fetchFormateurs();
  }, []);

  const fetchFormateurs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/formateurs');
      setFormateurs(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des formateurs:', error);
    }
  };

  const deleteFormateur = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/formateurs/${id}`);
      fetchFormateurs(); // Recharger la liste des formateurs après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du formateur:', error);
    }
  };

  return (
    <div className="container">
      <h1>Liste des Formateurs</h1>
      <div className="container mt-4">
        <ul className="list-group">
          {formateurs.map(formateur => (
            <li key={formateur._id} className="list-group-item">
              <h2>{formateur.nom} {formateur.prenom}</h2>
              <p>Adresse : {formateur.adresse}</p>
              <p>Matricule : {formateur.matricule}</p>
              <p>Date de Naissance : {new Date(formateur.dateNaissance).toLocaleDateString()}</p>
              <p>Numéro de Téléphone : {formateur.numTelephone}</p>
              <div className="d-flex justify-content-end">
                <button  onClick={() => deleteFormateur(formateur._id)}>Supprimer</button>
                <Link to={`/updateformateur/${formateur._id}`}>
                  <button >Update</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
