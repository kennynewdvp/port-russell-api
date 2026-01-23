const Catway = require('../models/catway');

// --- LISTER TOUS LES CATWAYS ---
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des catways");
    }
};

// --- DÉTAILS D'UN CATWAY ---
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).send("Catway non trouvé");
        res.render('catway-details', { catway });
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
};

// --- CRÉER UN CATWAY (Version Sécurisée & Propre) ---
exports.createCatway = async (req, res) => {
    try {
        // On extrait explicitement les champs pour éviter les erreurs de nommage
        const { catwayNumber, type, catwayState } = req.body;

        const newCatway = new Catway({
            catwayNumber,
            type, // Utilise 'type' car c'est le nom dans ton modèle
            catwayState
        });

        await newCatway.save();
        res.redirect('/catways'); 

    } catch (error) {
        console.error("Erreur création catway:", error);
        // On renvoie un petit script pour éviter de rester bloqué sur une page blanche d'erreur
        res.status(400).send(`
            <script>
                alert("Erreur : Ce numéro de quai existe déjà ou les données sont invalides.");
                window.location.href = "/catways";
            </script>
        `);
    }
};

// --- MODIFIER L'ÉTAT D'UN CATWAY ---
exports.updateCatway = async (req, res) => {
    try {
        await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id }, 
            { catwayState: req.body.catwayState }
        );
        res.redirect('/catways/' + req.params.id); // Redirige vers les détails du quai
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};

// --- SUPPRIMER UN CATWAY ---
exports.deleteCatway = async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways');
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};