/**
 * @module models/Boat
 * @description Modèle Mongoose pour représenter un bateau au port
 */
const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Le nom du bateau est obligatoire"] 
    },
    owner: { 
        type: String, 
        required: [true, "Le nom du propriétaire est obligatoire"] 
    },
    length: { 
        type: Number, 
        required: [true, "La longueur est obligatoire"] 
    },
    // ON RAJOUTE LA CATÉGORIE ICI :
    category: { 
        type: String, 
        required: [true, "La catégorie est obligatoire"],
        default: "Classe A"
    },
    description: { 
        type: String,
        default: "Aucune description" 
    },
    arrivalDate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Boat', boatSchema);