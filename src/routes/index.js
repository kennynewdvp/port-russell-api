const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

// --- ROUTES PUBLIQUES ---
router.get('/', (req, res) => {
    res.render('login'); 
});

router.post('/auth/login', userController.login);
router.get('/logout', userController.logout);


// --- ROUTES PRIVÉES ---

// --- ROUTES PRIVÉES ---

// Tableau de bord (Modifié pour appeler une fonction du contrôleur)
// Au lieu de (req, res) => { ... }, on appelle userController.getDashboard
router.get('/dashboard', userController.getDashboard);

// --- GESTION DES CATWAYS (Points 3.1, 3.3 et 5) ---
router.get('/catways', catwayController.getAllCatways); // Liste
router.post('/catways', catwayController.createCatway); // AJOUT : Création [cite: 2026-01-23]
router.get('/catways/:id', catwayController.getCatwayById); // Détails
router.post('/catways/:id', catwayController.updateCatway); // AJOUT : Modification [cite: 2026-01-23]
router.post('/catways/delete/:id', catwayController.deleteCatway); // AJOUT : Suppression [cite: 2026-01-23]

// --- GESTION DES RÉSERVATIONS (Point 3.2) ---
router.get('/catways/:id/reservations', reservationController.getReservationsByCatway);
router.post('/catways/:id/reservations', reservationController.createReservation); // AJOUT : Création de résa
router.post('/catways/:id/reservations/:id_res/delete', reservationController.deleteReservation);

// --- GESTION DES UTILISATEURS (Point 3.3) ---
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser); // AJOUT : Créer user [cite: 2026-01-23]
router.post('/users/:id', userController.updateUser); // AJOUT : Modifier user [cite: 2026-01-23]
router.post('/users/delete/:id', userController.deleteUser); // AJOUT : Supprimer user [cite: 2026-01-23]

module.exports = router;