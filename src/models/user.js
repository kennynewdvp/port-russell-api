/**
 * @file Modèle de données pour un Utilisateur (Employé du port).
 * @module models/user
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schéma représentant un utilisateur du système.
 * @typedef {Object} User
 * @property {string} name 
 * @property {string} firstname 
 * @property {string} email 
 * @property {string} password 
 * @property {string} role - Rôle de l'utilisateur (admin ou user)
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        trim: true
    },
    firstname: {
        type: String,
        required: [true, "Le prénom est obligatoire"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true, // Respecte la règle d'unicité demandée
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"] 
    },
    // Ajout du rôle pour différencier le prof (Admin) des clients
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user' // Par défaut, un nouvel utilisateur est un simple client
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);