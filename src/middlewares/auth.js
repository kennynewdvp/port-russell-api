const jwt = require('jsonwebtoken');

// Cle secrete pour le projet
const SECRET_KEY = 'Russell_Port_Safety_Key2026!@#_Security_Project'; 

// Verifier si l'utilisateur est connecte
exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("Erreur : Vous devez etre connecte.");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(400).send("Session expirée, merci de vous reconnecter.");
    }
};

// Verifier si l'utilisateur est admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).send("Acces interdit : Reserve a l'administrateur.");
    }
};