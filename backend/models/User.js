const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  projetsInscrits: [{ type: Schema.Types.ObjectId, ref: 'Projet' }, { required: false },{defalut: []}],
  competencesAcquises: [{ type: Schema.Types.ObjectId, ref: 'Competence' }, { required: false },{defalut: []}],
  projetsCrees: [{ type: Schema.Types.ObjectId, ref: 'Projet' }, { required: false },{defalut: []}]
});

module.exports = mongoose.model('User', userSchema);
