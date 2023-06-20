const mongoose = require('mongoose');

const db = require('../config/db');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  motdepasse: { type: String, required: true },
  userType: { type: String, default: 'admin' } 
});

module.exports = mongoose.model('Admin', AdminSchema);
