const express = require('express');
const router = express.Router();
const Etudiant = require('../models/User');
// Middleware d'authentification
 router.use(authMiddleware);
// Route pour récupérer tous les étudiants
router.get('/all/', async (req, res) => {
  try {
    const etudiants = await Etudiant.find().populate("projetsInscrits").populate("CompetencesAcquises");
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour récupérer un étudiant par son id
router.get('/get/:id', getEtudiant, (req, res) => {
  res.json(res.etudiant);
});

// Route pour créer un nouvel étudiant
router.post('/add/', async (req, res) => {
  const etudiant = new Etudiant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    motdepasse: req.body.motdepasse,
    userType: 'etudiant'
  });

  try {
    const newEtudiant = await etudiant.save();
    res.status(201).json(newEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour mettre à jour un étudiant
router.patch('/update/:id', getEtudiant, async (req, res) => {
  if (req.body.nom != null) {
    res.etudiant.nom = req.body.nom;
  }
  if (req.body.prenom != null) {
    res.etudiant.prenom = req.body.prenom;
  }
  if (req.body.email != null) {
    res.etudiant.email = req.body.email;
  }
  if (req.body.motdepasse != null) {
    res.etudiant.motdepasse = req.body.motdepasse;
  }

  try {
    const updatedEtudiant = await res.etudiant.save();
    res.json(updatedEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Route pour supprimer un étudiant
router.delete('/delete/:id', getEtudiant, async (req, res) => {
  try {
    await Etudiant.deleteOne({ _id: req.params.id });
    res.json({ message: "Etudiant supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', (req, res) => {
  const { email, motdepasse } = req.body;

  Etudiant.findOne({ email: email, motdepasse: motdepasse })
    .then((etudiant) => {
      if (!etudiant) {
        return res.status(401).json({ message: "Identifiants invalides pour l'étudiant" });
      }

      res.json({ message: "Connexion réussie en tant qu'étudiant" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la recherche de l'étudiant" });
    });
});




// Middleware pour récupérer un étudiant par son id
async function getEtudiant(req, res, next) {
  let etudiant;
  try {
    etudiant = await Etudiant.findById(req.params.id);
    if (etudiant == null) {
      return res.status(404).json({ message: "Etudiant non trouvé" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.etudiant = etudiant;
  next();
}

module.exports = router;
