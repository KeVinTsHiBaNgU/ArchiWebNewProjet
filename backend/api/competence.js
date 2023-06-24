const express = require("express");
const router = express.Router();
const Competence = require("../models/Competence");
// Route pour créer une nouvelle compétence
router.post('/new', async (req, res) => {
    try {
      const { nom, description, competencesRequises, niveau, parent } = req.body;
  
      const nouvelleCompetence = new Competence({
        nom,
        description
      });
  
      const competenceCreee = await nouvelleCompetence.save();
  
      res.status(201).json(competenceCreee);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la compétence' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const competence = await Competence.findById(req.params.id);
  
      res.json(competence);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
    }
  });
  // GET - Récupérer toutes les compétences
router.get('/', async (req, res) => {
  try {
    const competences = await Competence.find();
    res.json(competences);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
  }
});
  module.exports = router;