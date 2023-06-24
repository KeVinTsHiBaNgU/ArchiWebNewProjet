const express = require('express');
const router = express.Router();
const Resultat = require('../models/resultat');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour récupérer un résultat par l'ID de l'étudiant et de la compétence
// Middleware d'authentification
router.use(authMiddleware);
router.get('/:etudiantId/:competenceId', async (req, res) => {
  try {
    const resultat = await Resultat.findOne({
      etudiant: req.params.etudiantId,
      competence: req.params.competenceId
    }).exec();

    if (resultat) {
      res.json(resultat);
    } else {
      res.status(404).json({ message: 'Résultat non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du résultat' });
  }
});

// Route pour créer un résultat
router.post('/', async (req, res) => {
  try {
    const { etudiantId, competenceId, resultat, note } = req.body;

    const nouveauResultat = new Resultat({
      etudiant: etudiantId,
      competence: competenceId,
      resultat: resultat,
      note: note,
    });

    const resultatCree = await nouveauResultat.save();

    res.status(201).json(resultatCree);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du résultat' });
  }
});

// Route pour supprimer un résultat par l'ID de l'étudiant et de la compétence
router.delete('/:etudiantId/:competenceId', async (req, res) => {
  try {
    const resultatSupprime = await Resultat.findOneAndDelete({
      etudiant: req.params.etudiantId,
      competence: req.params.competenceId
    }).exec();

    if (resultatSupprime) {
      res.json({ message: 'Résultat supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Résultat non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du résultat' });
  }
});

module.exports = router;
