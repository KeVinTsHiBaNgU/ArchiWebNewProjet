const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');


const EtudiantSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  motdepasse: { type: String, required: true },
  projetsInscrits: [{ type: Schema.Types.ObjectId, ref: 'Projet' }],
  CompetencesAcquises: [{ type: Schema.Types.ObjectId, ref: 'Competence' }],
  userType: { type: String, default: 'etudiant' } // Champ userType ajouté pour les étudiants
});

module.exports = mongoose.model('Etudiant', EtudiantSchema);
