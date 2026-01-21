const jwt = require('jsonwebtoken');

// La clé secrète choisie pour le projet Russell [cite: 2026-01-20]
const SECRET_KEY = 'Russell_Port_Safety_Key2026!@#_Security_Project'; 

/**
 * Middleware de sécurité pour vérifier l'authentification de l'utilisateur.
 * Il vérifie la présence et la validité du token JWT stocké dans les cookies. [cite: 2026-01-15]
 */
module.exports = (req, res, next) => {
    // Récupération du token depuis les cookies [cite: 2026-01-15]
    const token = req.cookies.token;

    // Si aucun token n'est présent
    if (!token) {
        return res.status(401).json({ 
            message: "Accès refusé. Vous devez être connecté pour accéder à cette page." 
        });
    }

    try {
        // Vérification du token avec la clé secrète [cite: 2026-01-14, 2026-01-20]
        const decoded = jwt.verify(token, SECRET_KEY);

        // On ajoute les infos de l'utilisateur décodées à l'objet req [cite: 2026-01-15]
        req.user = decoded;

        // On passe à la suite (la route protégée)
        next();
    } catch (error) {
        // Si le token est expiré ou invalide
        res.clearCookie('token'); 
        return res.status(400).json({ 
            message: "Session expirée ou invalide. Veuillez vous reconnecter." 
        });
    }
};