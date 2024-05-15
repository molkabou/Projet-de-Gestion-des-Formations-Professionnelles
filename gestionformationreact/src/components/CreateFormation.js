import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CreateFormation = () => {
  const [formationData, setFormationData] = useState({
    titre: '',
    description: '',
    domaine: '',
    duree: '',
    dateDebut: '',
    dateFin: '',
    formateur: '', // Change this to hold the selected formateur ID
    participants: [],
    prix: '',
    lieu: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/formations', formationData);
      alert('Formation créée avec succès !');
      setFormationData({
        titre: '',
        description: '',
        domaine: '',
        duree: '',
        dateDebut: '',
        dateFin: '',
        formateur: '',
        participants: [],
        prix: '',
        lieu: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création de la formation :', error);
      alert('Une erreur est survenue lors de la création de la formation.');
    }
  };



  return (
    <div className="container">
      
    <h1>Créer une nouvelle Formation</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Titre :</label>
        <input type="text" name="titre" value={formationData.titre} onChange={handleChange} required />
      </div>
      <div>
        <label>Description :</label>
        <textarea name="description" value={formationData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Domaine :</label>
        <input type="text" name="domaine" value={formationData.domaine} onChange={handleChange} required />
      </div>
      <div>
        <label>Durée (en jours) :</label>
        <input type="number" name="duree" value={formationData.duree} onChange={handleChange} required />
      </div>
      <div>
        <label>Date de début :</label>
        <input type="date" name="dateDebut" value={formationData.dateDebut} onChange={handleChange} required />
      </div>
      <div>
        <label>Date de fin :</label>
        <input type="date" name="dateFin" value={formationData.dateFin} onChange={handleChange} required />
      </div>
      <div>
          <label>Formateur :</label>
          <select name="formateur" value={formationData.formateur} onChange={handleChange} required>
            <option value="">Sélectionner un formateur</option>
            {formateurs.map(formateur => (
              <option key={formateur._id} value={formateur._id}>
                {formateur.nom} {formateur.prenom}
              </option>
            ))}
          </select>
        </div>
      <div>
        <label>Prix :</label>
        <input type="number" name="prix" value={formationData.prix} onChange={handleChange} required />
      </div>
      <div>
        <label>Lieu :</label>
        <input type="text" name="lieu" value={formationData.lieu} onChange={handleChange} required />
      </div>
      <button type="submit">Créer Formation</button>
    </form>    
  </div>
  );
};


export default CreateFormation;