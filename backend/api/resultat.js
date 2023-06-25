const express = require('express');
const router = express.Router();
const Resultat = require('../models/resultat');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour récupérer un résultat par l'ID de l'étudiant et de la compétence
// Middleware d'authentification
router.use(authMiddleware);
router.get('/:competenceId', async (req, res) => {
  try {
    const user=req.user;
    const resultat = await Resultat.findOne({
      etudiant: user._id,
      competence: req.params.competenceId
    }).populate("competence").exec();

    if (resultat) {
      res.json(resultat);
    } else {
      res.status(404).json({ message: 'Résultat non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du résultat' });
  }
});
router.get('/', async (req, res) => {
  try {
    const user=req.user;
    const resultats = await Resultat.find({
      etudiant: user._id
    }).populate("competence").exec();

    if (resultats) {
      res.json(resultats);
    } else {
      res.status(404).json({ message: 'Résultat non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du résultat' });
  }
});

// Route pour créer un résultat
router.post('/new', async (req, res) => {
  try {
    const user=req.user;
    const {  competenceId} = req.body;

    const nouveauResultat = new Resultat({
      etudiant: user._id,
      competence: competenceId,
      resultat: "non acquis",
      note: 0,
    });

    const resultatCree = await nouveauResultat.save();

    res.status(201).json(resultatCree);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du résultat' });
  }
});

// Route pour supprimer un résultat par l'ID de l'étudiant et de la compétence
router.delete('/:competenceId', async (req, res) => {
  try {
    const user=req.user;
    const resultatSupprime = await Resultat.findOneAndDelete({
      etudiant: user._id,
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
