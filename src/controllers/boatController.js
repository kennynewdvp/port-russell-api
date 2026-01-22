/**
 * @module controllers/boatController
 * @description Logique métier pour la gestion des bateaux
 */
const Boat = require('../models/boat');

/**
 * Récupère la liste de tous les bateaux
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.find();
        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bateaux", error });
    }
};

/**
 * Ajoute un nouveau bateau au port
 * @param {Object} req - Requête Express (contenant name, owner, length, description)
 * @param {Object} res - Réponse Express
 */
exports.createBoat = async (req, res) => {
    try {
        const newBoat = new Boat(req.body);
        await newBoat.save();
        res.status(201).json({ message: "Bateau ajouté avec succès !", boat: newBoat });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'ajout", error });
    }
};