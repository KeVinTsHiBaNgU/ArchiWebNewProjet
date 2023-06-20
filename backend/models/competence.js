const mongoose = require('mongoose');

const db = require('../config/db'); 

const CompetenceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  competencesRequises: [{ type: Schema.Types.ObjectId, ref: 'Competence' }],
  niveau: { type: Number, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Competence' }
});

module.exports = mongoose.model('Competence', CompetenceSchema);
