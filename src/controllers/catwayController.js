const Catway = require('../models/catway');

// --- LISTER TOUS LES CATWAYS (Point 3.1) ---
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des catways");
    }
};

// --- DÉTAILS D'UN CATWAY (Point 3.1) ---
exports.getCatwayById = async (req, res) => {
    try {
        // On cherche par catwayNumber comme dans tes fichiers JSON
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).send("Catway non trouvé");
        res.render('catway-details', { catway });
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
};

// --- CRÉER UN CATWAY (Point 3.3) ---
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.redirect('/catways'); // Redirige vers la liste pour voir le nouveau
    } catch (error) {
        res.status(400).send("Erreur lors de la création du catway");
    }
};

// --- MODIFIER L'ÉTAT D'UN CATWAY (Point 3.3) ---
exports.updateCatway = async (req, res) => {
    try {
        // On met à jour uniquement l'état (catwayState) comme souvent demandé
        await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id }, 
            { catwayState: req.body.catwayState }
        );
        res.redirect('/catways');
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};

// --- SUPPRIMER UN CATWAY (Point 5) ---
exports.deleteCatway = async (req, res) => {
    try {
        // On utilise l'ID MongoDB pour la suppression (plus sûr)
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways');
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};