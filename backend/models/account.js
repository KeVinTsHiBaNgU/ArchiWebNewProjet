const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motdepasse: {
    type: String,
    required: true,
    minlength: 6
  },
  typeCompte: {
    type: String,
    required: true
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
