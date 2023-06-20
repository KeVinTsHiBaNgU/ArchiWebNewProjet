const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db'); 
const cors = require('cors'); 

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey);


const app = express();

// Import des routes
const etudiantRoutes = require('./routes/etudiant');
const enseignantRoutes = require('./routes/enseignant');
const projetRoutes = require('./routes/projet');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');


// Middleware pour parser les requêtes entrantes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation du middleware CORS
app.use(cors());

// Connexion à la base de données
mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error) => {
    // console.log("Connexion à la base de données échouée !");
    console.log(error.message);
  });

// Routes
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/enseignants', enseignantRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/login', loginRoutes);


// Route de test de la connexion avec la base de données
app.get('/', (req, res) => {
  res.send("Connexion à la base de données réussie !");
});

// Lancement du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});