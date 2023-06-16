// const jwt = require("jsonwebtoken");
// const userService = require('../../services/userService');

// const secretKey = "d252f4f6566116df4ab111de1bbdcd81";

// function authMiddleware(req, res, next) {
//   // const token = req.headers.authorization;

//   // Récupérer le token d'authentification depuis la requête
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Token d'authentification manquant" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       // console.log("token " + token + " " + secretKey);
//       return res
//         .status(401)
//         .json({ message: "Token d'authentification invalide" });
//     }

//     req.userId = decoded.userId;
//     next();
//   });
// }

// module.exports = authMiddleware;
// const jwt = require('jsonwebtoken');
// const User = require('../../backend/models/User');
// const secretKey = 'd252f4f6566116df4ab111de1bbdcd81';

// const authMiddleware = (req, res, next) => {

//   const token = req.headers.authorization?.split(' ')[1];
//   console.log(token + ' tetetete ');

//   if (!token) {
//     return res.status(401).json({ message: 'Token d\'authentification manquant' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token d\'authentification invalide' });
//     }

//     User.findById(decoded.userId)
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ message: 'Utilisateur non trouvé' });
//         }

//         req.user = user;
//         next();
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
//       });
//   });
// };

// module.exports = authMiddleware;

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
      const admin = userService.getAdmin(adminId);

      if (!admin) {
        return res.status(401).json({ message: 'Utilisateur non autorisé' });
      }

      // Ajouter l'administrateur à l'objet de requête
      req.user = admin;

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'authentification' });
  }
};

module.exports = authMiddleware;


