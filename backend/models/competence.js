const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const CompetenceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
 
});

module.exports = mongoose.model('Competence', CompetenceSchema);
