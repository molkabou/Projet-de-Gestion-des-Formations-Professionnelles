const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation');

// Route GET pour récupérer toutes les formations
router.get('/formations', async (req, res) => {
  try {
    const formations = await Formation.find();
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/formations/:id', async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation not found' });

    res.json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST pour créer une nouvelle formation
router.post('/formations', async (req, res) => {
  const formation = new Formation({
    titre: req.body.titre,
    description: req.body.description,
    domaine: req.body.domaine,
    duree: req.body.duree,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    formateur: req.body.formateur,
    participants: req.body.participants,
    prix: req.body.prix,
    lieu: req.body.lieu
    
  });

  try {
    const newFormation = await formation.save();
    res.status(201).json(newFormation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route PUT pour mettre à jour une formation existante
router.put('/formations/:id', async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation not found' });

    formation.titre = req.body.titre;
    formation.description = req.body.description;
    formation.domaine = req.body.domaine;
    formation.duree = req.body.duree;
    formation.dateDebut = req.body.dateDebut;
    formation.dateFin = req.body.dateFin;
    formation.formateur = req.body.formateur;
    formation.participants = req.body.participants;
    formation.prix = req.body.prix;
    formation.lieu = req.body.lieu;
    // Met à jour d'autres champs si nécessaire

    const updatedFormation = await formation.save();
    res.json(updatedFormation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route DELETE pour supprimer une formation
router.delete('/:id', async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation not found' });

    await Formation.deleteOne({ _id: req.params.id });
    res.json({ message: 'Formation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
