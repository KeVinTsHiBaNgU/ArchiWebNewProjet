const jwt = require('jsonwebtoken');
const secretKey = 'd252f4f6566116df4ab111de1bbdcd81';
const userService = require('../../services/userService');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(req.headers.authorization?.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token d\'authentification invalide' });
      }

      const adminId = decoded.userId;

      // Vérifier si l'administrateur existe ou a les autorisations appropriées
      userService.getAdmin(adminId)
        .then(admin => {
          if (!admin) {
            return res.status(401).json({ message: 'Utilisateur non autorisé' });
          }

          // Ajouter l'administrateur à l'objet de requête
          req.user = admin;

          next();
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'authentification' });
  }
};

module.exports = authMiddleware;
