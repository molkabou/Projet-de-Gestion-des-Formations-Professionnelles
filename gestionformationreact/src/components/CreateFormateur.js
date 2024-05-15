import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateFormateur = () => {
  const [formateurData, setFormateurData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    matricule: '',
    dateNaissance: '',
    numTelephone: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormateurData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/formateurs', formateurData);
      alert('Formateur créé avec succès !');
      // Réinitialiser les champs du formulaire après la soumission réussie
      setFormateurData({
        nom: '',
        prenom: '',
        adresse: '',
        matricule: '',
        dateNaissance: '',
        numTelephone: ''
      });
    } catch (error) {
      console.error('Erreur lors de la création du formateur :', error);
      alert('Une erreur est survenue lors de la création du formateur.');
    }
  };

  return (
    <div className="container">
      
      <h1>Créer un nouveau Formateur</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom :</label>
          <input type="text" className="form-control" id="nom" name="nom" value={formateurData.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénom :</label>
          <input type="text" className="form-control" id="prenom" name="prenom" value={formateurData.prenom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">Adresse :</label>
          <input type="text" className="form-control" id="adresse" name="adresse" value={formateurData.adresse} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="matricule" className="form-label">Matricule :</label>
          <input type="text" className="form-control" id="matricule" name="matricule" value={formateurData.matricule} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="dateNaissance" className="form-label">Date de Naissance :</label>
          <input type="date" className="form-control" id="dateNaissance" name="dateNaissance" value={formateurData.dateNaissance} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="numTelephone" className="form-label">Numéro de Téléphone :</label>
          <input type="text" className="form-control" id="numTelephone" name="numTelephone" value={formateurData.numTelephone} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Créer Formateur</button>
      </form>
    </div>
  );
};

export default CreateFormateur;
