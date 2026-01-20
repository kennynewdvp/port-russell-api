const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour l'utilisateur
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Empêche d'avoir deux fois le même email
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Crée automatiquement la date de création
});

module.exports = mongoose.model('User', UserSchema);