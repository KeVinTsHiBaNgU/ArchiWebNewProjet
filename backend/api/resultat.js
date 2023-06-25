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

router.put('/:Id', async (req, res) => {
  try {
    const competenceId = req.params.Id;

    const { resultat, note } = req.body;

    // Vérifier si le résultat existe
    const resultatExistant = await Resultat.findById(competenceId);

    if (!resultatExistant) {
      return res.status(404).json({ message: 'Résultat non trouvé' });
    }

    // Mettre à jour le résultat
    resultatExistant.resultat = resultat;
    resultatExistant.note = note;

    const resultatModifie = await resultatExistant.save();

    res.json(resultatModifie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la modification du résultat' });
  }
});

module.exports = router;
