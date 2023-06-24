const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  projetsInscrits: [{ type: Schema.Types.ObjectId, ref: 'Projet'}],
  CompetencesAcquises: [{ type: Schema.Types.ObjectId, ref: 'Competence'}],
  projetsCrees: [{ type: Schema.Types.ObjectId, ref: 'Projet'}]
});


module.exports = mongoose.model('User', userSchema);
