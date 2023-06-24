const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authMiddleware = require('./backend/middlewares/authMiddleware'); 

const User = require('./backend/models/User');

const app = express();
const port = 3000;

// Utilisation du body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
 }));

//app.use(cors());
//app.use(authMiddleware);

// Utiliser les routes de l'utilisateur
const userRoutes = require('./backend/api/UserRoutes');
const authRoutes = require('./backend/api/authRoutes');
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
// Import des routes
const etudiantRoutes = require('./backend/api/etudiant');
const enseignantRoutes = require('./backend/api/enseignant');
const projetRoutes = require('./backend/api/projet');
const competenceRoutes = require('./backend/api/competence');
const resultatRoutes = require('./backend/api/resultat');
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/enseignants', enseignantRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/competence', competenceRoutes);
app.use('/api/resultat', resultatRoutes);




// Connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projet-web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB !');
});

// Définition des routes
app.get('/', (req, res) => {
  res.send('Le serveur fonctionne !');
});

app.listen(port, () => {
  console.log(`Le serveur est à l'écoute sur le port ${port}`);
});
