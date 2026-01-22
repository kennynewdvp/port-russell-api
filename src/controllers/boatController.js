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

/**
 * Modifie un bateau existant (pour remplir catégorie et statut)
 * @param {Object} req - Requête Express (contenant l'ID dans les params)
 * @param {Object} res - Réponse Express
 */
exports.updateBoat = async (req, res) => {
    try {
        const { id } = req.params;
        // On met à jour le bateau avec les données envoyées dans le body (Postman)
        const updatedBoat = await Boat.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBoat) {
            return res.status(404).json({ message: "Bateau non trouvé" });
        }

        res.status(200).json({ message: "Bateau mis à jour !", boat: updatedBoat });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour", error });
    }
};