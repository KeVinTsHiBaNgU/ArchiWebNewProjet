const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

// Définition de l'énumération des résultats possibles
const ResultatEnum = Object.freeze({
  NON_ACQUIS: 'non_acquis',
  EN_COURS: 'en_cours',
  ACQUIS: 'acquis'
});

const ResultatSchema = new Schema({
  etudiant: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    validate: {
      validator: function(value) {
        return validateUserRole(value, 'student');
      },
      message: 'Only users with role "student" are allowed'
    }
  },
  competence: { type: Schema.Types.ObjectId, ref: 'Competence', required: true },
  resultat: { type: String, enum: Object.values(ResultatEnum), required: true },
  note: { type:  Number},
});

async function validateUserRole(userId, expectedRole) {
  const user = await User.findById(userId).exec();
  return user && user.role === expectedRole;
}

module.exports = mongoose.model('Resultat', ResultatSchema);
