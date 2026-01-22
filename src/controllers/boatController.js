const Boat = require('../models/boat');

// 1. Récupère tous les bateaux
exports.getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.find();
        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des bateaux", error });
    }
};

// 2. Ajoute un nouveau bateau
exports.createBoat = async (req, res) => {
    try {
        const newBoat = new Boat(req.body);
        await newBoat.save();
        res.status(201).json({ message: "Bateau ajouté avec succès !", boat: newBoat });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de l'ajout", error });
    }
};

// 3. Modifie un bateau (Mis à jour pour l'Issue #6)
exports.updateBoat = async (req, res) => {
    try {
        const updatedBoat = await Boat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBoat) return res.status(404).json({ message: "Bateau non trouvé" });
        res.status(200).json(updatedBoat);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la modification", error });
    }
};

// 4. Supprime un bateau (CRUCIAL POUR TON BOUTON ROUGE)
exports.deleteBoat = async (req, res) => {
    try {
        const deletedBoat = await Boat.findByIdAndDelete(req.params.id);
        if (!deletedBoat) {
            return res.status(404).json({ message: "Bateau non trouvé" });
        }
        res.status(200).json({ message: "Bateau supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
};