const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour la connexion (POST /auth/login)
router.post('/login', authController.login);

// Route pour la déconnexion (GET /auth/logout)
router.get('/logout', (req, res) => {
    // 1. On efface le cookie du navigateur
    res.clearCookie('token');
    
    // 2. On redirige vers la page de login
    res.redirect('/login');
});

module.exports = router;