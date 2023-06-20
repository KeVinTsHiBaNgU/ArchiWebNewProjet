const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition de l'énumération des résultats possibles
const ResultatEnum = Object.freeze({
  NON_ACQUIS: 'non_acquis',
  EN_COURS: 'en_cours',
  ACQUIS: 'acquis'
});

const ResultatSchema = new Schema({
  etudiant: { type: Schema.Types.ObjectId, ref: 'Etudiant', required: true },
  competence: { type: Schema.Types.ObjectId, ref: 'Competence', required: true },
  resultat: { type: String, enum: Object.values(ResultatEnum), required: true },
});

module.exports = mongoose.model('Resultat', ResultatSchema);