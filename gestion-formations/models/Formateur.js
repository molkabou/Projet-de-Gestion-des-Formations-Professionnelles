const mongoose = require('mongoose');

const formateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  matricule: { type: String, required: true, unique: true },
  dateNaissance: { type: Date, required: true },
  numTelephone: { type: String, required: true },
  // Autres champs si nécessaire
});

module.exports = mongoose.model('Formateur', formateurSchema);
