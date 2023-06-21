const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const ProjetSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  competencesAcquises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competence'
  }],
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enseignant',
    required: true
  },
  etudiantsInscrits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant'
  }]  
});

module.exports = mongoose.model('Projet', ProjetSchema);

// competences: [{ type: String, required: true }],