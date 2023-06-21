const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const EnseignantSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  motdepasse: { type: String, required: true },
  projetsCrees: [{ type: Schema.Types.ObjectId, ref: 'Projet' }],
  userType: { type: String, default: 'enseignant' }
});

module.exports = mongoose.model('Enseignant', EnseignantSchema);
