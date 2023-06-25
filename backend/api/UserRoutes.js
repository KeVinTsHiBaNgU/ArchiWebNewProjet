const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const userService = require('../../services/userService');
const jwt = require('jsonwebtoken');


const router = express.Router();
// Middleware d'authentification
router.use(authMiddleware);

router.get('/all/users', async (req, res) => {
  try {
    const users = await User.find().select('name email role'); // Sélectionnez uniquement les champs 'name', 'email' et 'role'
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

router.get('/current', async (req, res) => {
  try {
    // Utilisez les informations stockées dans la requête par le middleware d'authentification
    const currentUser = req.user;
    console.log(currentUser);
    res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des informations de l\'utilisateur' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    // Utilisez les informations stockées dans la requête par le middleware d'authentification
    const userId = req.user.id;
    const { name, email, password } = req.body;

    // Recherchez l'utilisateur dans la base de données par son identifiant
    const user = await User.findById(userId);

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettez à jour les informations de l'utilisateur
    user.name = name;
    user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Enregistrez les modifications dans la base de données
    await user.save();

    // Réponse de succès avec les informations mises à jour de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des informations de l\'utilisateur' });
  }
});



// Route pour la création d'un utilisateur par l'administrateur
router.post('/create',  async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const competenceAcquises= [];
    const projetsInscrits= [];
    const projetsCrees= [];
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      projetsInscrits,
      competenceAcquises,
      projetsCrees
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
});

router.get('/etudiants', async (req, res) => {
  try {
    const etudiants = await User.find({ role: 'student' });
    res.status(200).json(etudiants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des étudiants' });
  }
});



// Route pour récupérer les utilisateurs étudiants et enseignants
  router.get('/users',  async (req, res) => {
    try {
      const users = await User.find().populate("competencesAcquises").populate("projetsInscrits").populate("projetsCrees")
      if (!user.competencesAcquises) {
        user.competencesAcquises = []; // Initialise la propriété competencesAcquises avec un tableau vide s'il est null
      }
      
      if (!user.projetsInscrits) {
        user.projetsInscrits = []; // Initialise la propriété projetsInscrits avec un tableau vide s'il est null
      }
      
      if (!user.projetsCrees) {
        user.projetsCrees = []; // Initialise la propriété projetsCrees avec un tableau vide s'il est null
      };
      
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
      }
    });
    // Récupérer le rôle de l'utilisateur par son ID
router.get('/:id/role', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json({ role: user.role });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});
// Récupérer le rôle de l'utilisateur par son ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json({ user: user });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
