const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Competence= require('../models/competence');
const User= require('../models/User');
const Resultat= require('../models/resultat');
const authMiddleware = require('../middlewares/authMiddleware');
// Middleware d'authentification
router.use(authMiddleware);
// Route pour créer un projet
router.post('/new', async (req, res) => {
  try {
    console.log(req.body)
    const enseignant = await Promise.resolve(req.user);
    const { nom, description, competences } = req.body;
    const nouveauProjet = new Projet({ nom, description, enseignant });
    for (let compet of competences) {
      const competence = await Competence.findById(compet);
      nouveauProjet.competences.push(competence);
    }

    await nouveauProjet.save();
    return res.status(200).json(nouveauProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la sauvegarde du projet' });
  }
});


// POST /projet/inscription
// POST /projet/inscription
router.post('/inscription', async (req, res) => {
  try {
    const etudiant= await Promise.resolve(req.user);
    const { projetId} = req.body;

    // Vérifier si le projet existe
    const projet = await Projet.findById(projetId).populate("competences");
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }


    // Ajouter l'étudiant à la liste des étudiants inscrits du projet
    projet.etudiantsInscrits.push(etudiant);
    console.log(etudiant);
    await projet.save();
    let etud_modif= await User.findOne( { email: etudiant.email});
    // Ajouter le projet à la liste des projets inscrits de l'étudiant
    etud_modif.projetsInscrits.push(projet);
    console.log(etud_modif.name);
    await etud_modif.save();
    for (let competence of projet.competences){
      const nouveauResultat = new Resultat({
        etudiant: etud_modif._id,
        competence: competence._Id,
        resultat: "non acquis",
        note: 0,
      });
  
       await nouveauResultat.save();
    }
    res.status(200).json({ message: 'Étudiant inscrit au projet avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription à un projet' });
  }
});



// Route pour récupérer tous les projets
router.get('/other', async (req, res) => {
  try {
    const etudiant = await Promise.resolve(req.user);
  Projet.find({ etudiantsInscrits: { $nin: [etudiant._id] } })
    .populate('enseignant','name') // Récupère les informations de l'enseignant associé
    .then(projets => {
      if (!projets) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
       // Les informations de l'enseignant seront disponibles ici
    projets.forEach(projet => {
      const enseignant = projet.enseignant; // Accès à la propriété enseignant
      console.log(enseignant.name)});
      res.json(projets);
    })
    .catch(err => res.status(500).json({ error: err.message })); 
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la sauvegarde du projet' });
    }
});
// Route pour récupérer tous les projets
router.get('/', (req, res) => {
  Projet.find()
    .populate('enseignant') 
    .populate('etudiantsInscrits')
    .populate('competences') 
    .then(projets => {
      if (!projets) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
     
      res.json(projets);
    })
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
  const { nom, description, enseignant, competences} = req.body;
  Projet.findByIdAndUpdate(projetId)
    
    .catch(err => res.status(500).json({ error: err.message }));}


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
