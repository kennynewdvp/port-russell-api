const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Modèle de données pour une Réservation.
 */
const ReservationSchema = new Schema({
    catwayNumber: {
        type: Number,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    boatName: {
        type: String,
        required: true
    },
    // --- AJOUT DE LA TAILLE DU BATEAU ---
    boatSize: { 
        type: String, 
        enum: ['Short', 'Long'], 
        required: true 
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);