const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Recherche de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Utilisateur non trouvé !');
        }

        // 2. Vérification du mot de passe
        if (password !== user.password) {
            return res.status(401).send('Mot de passe incorrect !');
        }

        // 3. Création du Token avec la clé de ton fichier .env.dev 
        console.log("Ma clé est bien :", process.env.SECRET_KEY);
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY, // On récupère la clé du dossier env !
            { expiresIn: '24h' }
        );

        // 4. Stockage dans le cookie
        res.cookie('token', token, { httpOnly: true, secure: false });
        
        // 5. REDIRECTION vers le dashboard (Essentiel pour l'Issue #5)
        res.redirect('/dashboard');

    } catch (error) {
        res.status(500).send('Erreur serveur : ' + error.message);
    }
};