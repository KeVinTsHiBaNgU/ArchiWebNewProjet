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
    const nouveauProjet = new Projet({ nom, description, enseignant, competences });
    console.log(competences);

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
    const etudiant = await Promise.resolve(req.user);
    const { projetId } = req.body;

    // Vérifier si le projet existe
    const projet = await Projet.findById(projetId).populate("competences");
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    // Filtrer les compétences non acquises par l'étudiant
    const competencesNonAcquises = projet.competences.filter(competence => {
      // Vérifier si l'étudiant a déjà acquis cette compétence
      return !etudiant.competencesAcquises.includes(competence._id);
    });

    // Ajouter l'étudiant à la liste des étudiants inscrits du projet
    if (!projet.etudiantsInscrits.includes(etudiant._id)) {
      projet.etudiantsInscrits.push(etudiant);
    }
    await projet.save();

    // Ajouter le projet à la liste des projets inscrits de l'étudiant
    if (!etudiant.projetsInscrits.includes(projet._id)) {
      etudiant.projetsInscrits.push(projet);
    }
    await etudiant.save();

    // Ajouter les nouvelles compétences non acquises à l'étudiant
    for (let competence of competencesNonAcquises) {
      if (!etudiant.competencesAcquises.includes(competence._id)) {
        etudiant.competencesAcquises.push(competence);
      }
    }
    await etudiant.save();

    // Créer les résultats pour les nouvelles compétences non acquises
    for (let competence of competencesNonAcquises) {
      const existingResult = await Resultat.findOne({
        etudiant: etudiant._id,
        competence: competence._id
      });

      if (!existingResult) {
        const nouveauResultat = new Resultat({
          etudiant: etudiant._id,
          competence: competence._id,
          resultat: "non_acquis",
          note: 0,
        });

        await nouveauResultat.save();
      }
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
    .populate('enseignant') // Récupère les informations de l'enseignant associé
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
    .populate('enseignant') // Récupère les informations de l'enseignant associé
    .populate('etudiantsInscrits')
    .populate("competences") 
    .then(projet => {
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      res.json(projet);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Route pour mettre à jour un projet
router.put('/:id', async (req, res) => {
  try {
    const projetId = req.params.id;
    const { nom, description, competences } = req.body;
    console.log(competences);
    
    const proj = await Projet.findById(projetId).populate("competences");
    
    if (!proj) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    
    proj.nom = nom;
    proj.description = description;
    
    proj.competences = competences; // Remplacer l'ancien tableau de compétences par le nouveau
    
    const updatedProjet = await proj.save();
    
    res.json(updatedProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet" });
  }
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
