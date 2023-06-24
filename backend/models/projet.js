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
  competences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competence'
  }],
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  etudiantsInscrits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]  
});

module.exports = mongoose.model('Projet', ProjetSchema);

// competences: [{ type: String, required: true }],