const express = require("express");
const router = express.Router();
const Enseignant = require("../models/Compentence");
// Route pour créer une nouvelle compétence
router.post('/competence/new', async (req, res) => {
    try {
      const { nom, description, competencesRequises, niveau, parent } = req.body;
  
      const nouvelleCompetence = new Competence({
        nom,
        description,
        competencesRequises,
        niveau,
        parent
      });
  
      const competenceCreee = await nouvelleCompetence.save();
  
      res.status(201).json(competenceCreee);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la compétence' });
    }
  });
  router.get('/competences/:id', async (req, res) => {
    try {
      const competence = await Competence.findById(req.params.id)
        .populate('parent', 'nom') // Population de la compétence parent avec le champ 'nom'
        .populate('competencesRequises', 'nom'); // Population des compétences prérequises avec le champ 'nom'
  
      res.json(competence);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
    }
  });
  module.exports = router;