const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  domaine: { type: String, required: true },
  duree: { type: Number, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  formateur: { type: String, required: true },
  participants: { type: [String], default: [] },
  prix: { type: Number, required: true },
  lieu: String,
  // Ajoute d'autres champs selon tes besoins
});


module.exports = mongoose.model('Formation', formationSchema);

