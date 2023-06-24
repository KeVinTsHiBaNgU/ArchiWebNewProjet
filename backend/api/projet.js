const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const authMiddleware = require('../middlewares/authMiddleware');
// Middleware d'authentification
router.use(authMiddleware);
// Route pour créer un projet
router.post('/new', async (req, res) => {
  try {
    const enseignant = await Promise.resolve(req.user);
    const { nom, description, competences } = req.body;
    const nouveauProjet = new Projet({ nom, description, enseignant, competences });

    await nouveauProjet.save();
    return res.status(200).json(nouveauProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la sauvegarde du projet' });
  }
});

  


// Route pour récupérer tous les projets
router.get('/', (req, res) => {
  Projet.find()
    .populate('enseignant', 'nom prenom') // Récupère les informations de l'enseignant associé
    .populate('etudiantsInscrits', 'nom prenom') // Récupère les informations des étudiants inscrits
    .then(projets => res.json(projets))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour récupérer un projet par son ID
router.get('/:id', (req, res) => {
  const projetId = req.params.id;

  Projet.findById(projetId)
    .populate('enseignant', 'nom prenom') // Récupère les informations de l'enseignant associé
    .populate('etudiantsInscrits', 'nom prenom') // Récupère les informations des étudiants inscrits
    .then(projet => {
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      res.json(projet);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour mettre à jour un projet
router.put('/:id', (req, res) => {
  const projetId = req.params.id;
  const { nom, description, enseignant } = req.body;

  Projet.findByIdAndUpdate(projetId, { nom, description, enseignant }, { new: true })
    .then(projet => {
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      res.json(projet);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour supprimer un projet
router.delete('/:id', (req, res) => {
  const projetId = req.params.id;

  Projet.findByIdAndDelete(projetId)
    .then(projet => {
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      res.json({ message: 'Projet supprimé avec succès' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
