const express = require('express');
const router = express.Router();
const Formateur = require('../models/Formateur');

async function getFormateur(req, res, next) {
  let formateur;
  try {
    formateur = await Formateur.findById(req.params.id);
    if (formateur == null) {
      return res.status(404).json({ message: 'Formateur introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.formateur = formateur;
  next();
}

router.get('/', async (req, res) => {
  try {
    const formateurs = await Formateur.find();
    res.json(formateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getFormateur, (req, res) => {
  res.json(res.formateur);
});

router.post('/', async (req, res) => {
  const formateur = new Formateur({
    nom: req.body.nom,
    prenom: req.body.prenom,
    adresse: req.body.adresse,
    matricule: req.body.matricule,
    dateNaissance: req.body.dateNaissance,
    numTelephone: req.body.numTelephone
  });

  try {
    const newFormateur = await formateur.save();
    res.status(201).json(newFormateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', getFormateur, async (req, res) => {
  if (req.body.nom != null) {
    res.formateur.nom = req.body.nom;
  }
  if (req.body.prenom != null) {
    res.formateur.prenom = req.body.prenom;
  }
  if (req.body.adresse != null) {
    res.formateur.adresse = req.body.adresse;
  }
  if (req.body.matricule != null) {
    res.formateur.matricule = req.body.matricule;
  }
  if (req.body.dateNaissance != null) {
    res.formateur.dateNaissance = req.body.dateNaissance;
  }
  if (req.body.numTelephone != null) {
    res.formateur.numTelephone = req.body.numTelephone;
  }

  try {
    const updatedFormateur = await res.formateur.save();
    res.json(updatedFormateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const formateur = await Formateur.findById(req.params.id);
    if (!formateur) return res.status(404).json({ message: 'Formateur not found' });

    await Formateur.deleteOne({ _id: req.params.id });
    res.json({ message: 'Formateur deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
