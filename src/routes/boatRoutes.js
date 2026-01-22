/**
 * @module routes/boatRoutes
 * @description Routes pour la gestion des bateaux (protégées par JWT)
 */
const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boatController');
const auth = require('../middlewares/auth'); // Ton garde-barrière !

// Route pour voir tous les bateaux (Besoin d'être connecté)
router.get('/', auth, boatController.getAllBoats);

// Route pour ajouter un bateau (Besoin d'être connecté)
router.post('/add', auth, boatController.createBoat);
router.patch('/:id', auth, boatController.updateBoat);
router.put('/:id', auth, boatController.updateBoat);
module.exports = router;