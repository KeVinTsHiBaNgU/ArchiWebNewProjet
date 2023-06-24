const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  id_user: { type: String, unique: true },
  projetsInscrits: [{ type: Schema.Types.ObjectId, ref: 'Projet', validate: { validator: isStudent, message: 'Only available for students' }, default: [] }],
  CompetencesAcquises: [{ type: Schema.Types.ObjectId, ref: 'Competence', validate: { validator: isStudent, message: 'Only available for students' }, default: [] }],
  projetsCrees: [{ type: Schema.Types.ObjectId, ref: 'Projet', validate: { validator: isTeacher, message: 'Only available for teachers' }, default: [] }]
});

function isStudent() {
  return this.role === 'student';
}

function isTeacher() {
  return this.role === 'teacher';
}

module.exports = mongoose.model('User', userSchema);
