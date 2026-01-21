const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Modèle de données pour un Catway.
 */
const CatwaySchema = new Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true //  emplacement a un numéro unique
    },
    type: {
        type: String,
        enum: ['long', 'short'], //  seulement ces deux valeurs
        required: true
    },
    catwayState: {
        type: String,
        required: true,
        default: "Bon état" // Par défaut, on considère qu'il est OK
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', CatwaySchema);