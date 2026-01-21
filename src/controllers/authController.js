const User = require('../models/user');
const jwt = require('jsonwebtoken');

// clé secrète 
const SECRET_KEY = 'Russell_Port_Safety_Key2026!@#_Security_Project';

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. On cherche l'utilisateur dans la base
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }

        // 2. On vérifie le mot de passe 
        if (password !== user.password) {
            return res.status(401).json({ message: 'Mot de passe incorrect !' });
        }

        // 3. Si tout est bon, on crée le Token JWT 
        const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // 4. On envoie le token dans un cookie sécurisé
        res.cookie('token', token, { httpOnly: true, secure: false }); // secure: false car on est en local (HTTP)
        
        res.status(200).json({ message: 'Connexion réussie !' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};