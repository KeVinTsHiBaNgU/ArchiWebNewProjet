const User = require('../backend/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'd252f4f6566116df4ab111de1bbdcd81';

// Méthode de connexion de l'utilisateur
async function login(email, password) {
  const user = await User.findOne({ email }).populate("competencesAcquises").populate("projetsInscrits").populate("projetsCrees");
  if (!user.competencesAcquises) {
    user.competencesAcquises = []; // Initialise la propriété competencesAcquises avec un tableau vide s'il est null
  }
  
  if (!user.projetsInscrits) {
    user.projetsInscrits = []; // Initialise la propriété projetsInscrits avec un tableau vide s'il est null
  }
  
  if (!user.projetsCrees) {
    user.projetsCrees = []; // Initialise la propriété projetsCrees avec un tableau vide s'il est null
  }
  console.log(user.role);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
}

// Méthode pour récupérer l'administrateur par son ID
async function getAdmin(adminId) {
  try {
    const admin = await User.findById(adminId).populate("projetsInscrits").populate("competencesAcquises").populate("projetsCrees");

    if (!admin) {
      return null;
    }

    return admin;
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération de l\'administrateur');
  }
}

// Méthode pour générer le token d'authentification
function generateToken(userId) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  console.log(token + " " + '2');
  return token;
}

// Fonction pour rediriger l'utilisateur en fonction de son rôle
function redirectUserByRole(role) {
  if (role === 'admin') {
    return '/dashboard'; // Redirection vers la page du tableau de bord de l'administrateur
  } else if (role === 'teacher') {
    return '/enseignant/dashboard'; // Redirection vers la page du tableau de bord de l'enseignant
  } else if (role === 'student') {
    return '/student/dashboard'; // Redirection vers la page du tableau de bord de l'étudiant
  } else {
    return '/'; // Redirection vers une page par défaut si le rôle n'est pas reconnu
  }
}

module.exports = {
  login,
  getAdmin,
  generateToken,
  redirectUserByRole
};
