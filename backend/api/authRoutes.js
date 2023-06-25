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
      console.log('Utilisateur introuvable');
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const token = userService.generateToken(user._id);
    const redirectUrl = userService.redirectUserByRole(user.role);
    console.log(token);
    console.log(user.role);

    console.log('Connexion réussie  :', user.email);

    res.status(200).json({ token , redirectUrl});
  } catch (error) {
    console.log('Erreur de connexion :', error);
    res.status(500).json({ message: 'Erreur de connexion' });
  }
});


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
