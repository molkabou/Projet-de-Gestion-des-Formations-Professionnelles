import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';// Import the Link component

import "./css.css";
const App = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/formations');
        setFormations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    };

    fetchFormations();
  }, []);

  const deleteFormation = async (formationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/formations/${formationId}`);
      setFormations(formations.filter(formation => formation._id !== formationId)); // Remove the deleted formation from the list
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
    }
  };

  return (
    <div className="container">
      
      <div className="container mt-4">
        <h1>Liste des Formations</h1>
        <ul className="list-group">
          {formations.map(formation => (
            <li key={formation._id} className="list-group-item">
              <h2>{formation.titre}</h2>
              <p>Description : {formation.description}</p>
              <p>Domaine : {formation.domaine}</p>
              <p>Durée : {formation.duree}</p>
              <p>Date de début : {formation.dateDebut}</p>
              <p>Date de fin : {formation.dateFin}</p>
              <p>Formateur : {formation.formateur}</p>
              <p>Participants : {formation.participants.join(', ')}</p>
              <p>Prix : {formation.prix}</p>
              <p>Lieu : {formation.lieu}</p>
              <div className="d-flex justify-content-end">
                {/* Delete button */}
                <button onClick={() => deleteFormation(formation._id)}>Supprimer</button>
                {/* "Update" button that redirects to the update page */}
                <Link to={`/update/${formation._id}`}>
                  <button>Update</button>
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
