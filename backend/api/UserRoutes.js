const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const userService = require('../../services/userService');
const jwt = require('jsonwebtoken');


const router = express.Router();

// Fonction pour générer un id_user unique
function generateUniqueUserId() {
  let idUser = '23';
  for (let i = 0; i < 6; i++) {
    idUser += Math.floor(Math.random() * 10);
  }
  return idUser;
}

// Route pour la création d'un utilisateur par l'administrateur
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const id_user = generateUniqueUserId();
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      id_user
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
});


// Route pour récupérer les utilisateurs étudiants et enseignants
  router.get('/admin/users', authMiddleware, async (req, res) => {
    try {
      // Vérifier le rôle de l'utilisateur authentifié (administrateur)
      console.log(req.user.role);
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }
      
      // Récupérer les utilisateurs ayant le rôle "étudiant" ou "enseignant"
      const users = await User.find({ role: { $in: ['student', 'teacher'] } });
      
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
      }
    });
    
  
  // Route pour récupérer les étudiants et les enseignants pour le tableau de bord de l'administrateur
  // Route pour récupérer les utilisateurs étudiants et enseignants pour le tableau de bord de l'administrateur
// router.get('/admin/users', authMiddleware, async (req, res) => {
//   try {
//     // const token = req.headers.authorization;

//     const token = req.headers.authorization.split(' ')[1];
//     console.log("tu ne rentres pas");
//     console.log(token);
//     const users = await userService.getUsersForAdminDashboard(token);

//     if (!token) {
//       return res.status(401).json({ message: 'Token d\'authentification manquant' });
//     }

//     // const users = await userService.getUsersForAdminDashboard(token);  

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
//   }
// });

module.exports = router;
