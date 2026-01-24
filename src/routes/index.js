const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

// Import du middleware de securite
const auth = require('../middlewares/auth');

// --- ROUTES PUBLIQUES ---
router.get('/', (req, res) => {
    res.render('login'); 
});

router.post('/auth/login', userController.login);
router.get('/logout', userController.logout);

// --- ROUTES PRIVEES ---

// Tableau de bord 
router.get('/dashboard', auth.isAuthenticated, userController.getDashboard);

// --- GESTION DES CATWAYS ---
router.get('/catways', auth.isAuthenticated, catwayController.getAllCatways);
router.get('/catways/:id', auth.isAuthenticated, catwayController.getCatwayById);
router.post('/catways', auth.isAuthenticated, auth.isAdmin, catwayController.createCatway);
router.post('/catways/:id', auth.isAuthenticated, auth.isAdmin, catwayController.updateCatway);
router.post('/catways/delete/:id', auth.isAuthenticated, auth.isAdmin, catwayController.deleteCatway);

// --- GESTION DES RESERVATIONS ---
router.get('/catways/:id/reservations', auth.isAuthenticated, reservationController.getReservationsByCatway);
router.post('/catways/:id/reservations', auth.isAuthenticated, auth.isAdmin, reservationController.createReservation);
router.post('/catways/:id/reservations/:id_res/delete', auth.isAuthenticated, auth.isAdmin, reservationController.deleteReservation);

// --- GESTION DES UTILISATEURS ---
router.get('/users', auth.isAuthenticated, auth.isAdmin, userController.getAllUsers);
router.post('/users', auth.isAuthenticated, auth.isAdmin, userController.createUser);
router.post('/users/:id', auth.isAuthenticated, auth.isAdmin, userController.updateUser);
router.get('/users/delete/:id', auth.isAuthenticated, auth.isAdmin, userController.deleteUser);

module.exports = router;