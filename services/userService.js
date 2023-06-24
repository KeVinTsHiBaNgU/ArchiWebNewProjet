const User = require('../backend/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'd252f4f6566116df4ab111de1bbdcd81';

// Méthode de connexion de l'utilisateur
async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
}

// Méthode pour récupérer l'utilisateur par son ID
async function getAdmin(adminId) {
  try {
    const admin = await User.findById(adminId);

    if (!admin ) {
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



module.exports = {
  login,
  getAdmin,
  generateToken,
};
