const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projet-web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connecté à la base de données');
    createAdmin();
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données', error);
  });

async function createAdmin() {
  try {
    // Vérifier si l'administrateur existe déjà
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('L\'administrateur existe déjà dans la base de données.');
      return;
    }

    // Créer un nouvel administrateur
    const adminUser = new User({
      name: 'Kevin Admin',
      email: 'kevin@admin.com',
      password: '',
      role: 'admin',
    });

    // Générer un sel pour le hachage
    const salt = await bcrypt.genSalt(10);

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash('adminpassword', salt);

    // Définir le mot de passe hashé sur l'objet User
    adminUser.password = hashedPassword;

    // Enregistrer l'administrateur dans la base de données
    await adminUser.save();

    console.log('L\'administrateur a été créé avec succès.');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création de l\'administrateur.', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
  }
}
