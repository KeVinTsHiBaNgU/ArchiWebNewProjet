const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userService = require('../../services/userService');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Tentative de connexion avec les informations suivantes :');
    console.log('Email :', email);
    console.log('Mot de passe :', password);

    const user = await userService.login(email, password);

    if (!user) {
      console.log('Administrateur introuvable');
      return res.status(404).json({ message: 'Administrateur introuvable' });
    }

    const token = userService.generateToken(user._id);
    console.log(token);
   
    console.log('Connexion réussie pour l\'administrateur :', user.email);

    res.status(200).json({ token });
  } catch (error) {
    console.log('Erreur de connexion :', error);
    res.status(500).json({ message: 'Erreur de connexion' });
  }
});

// router.get('/admin/users', authMiddleware, async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; // Récupérez le token d'authentification depuis les headers de la requête
//     userService.getUsersForAdminDashboard(token); // Appelez la méthode du userService avec le token

//     res.status(200).json({ message: 'Opération en cours' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
//   }
// });
router.get('/admin/dashboard', authMiddleware, async (req, res) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    const token = userService.generateToken(user._id);
    console.log(token);
    // const users = await userService.getUsersForAdminDashboard(token);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});


module.exports = router;
