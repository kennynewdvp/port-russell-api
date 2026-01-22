const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boatController');
const auth = require('../middlewares/auth');

// Route pour voir tous les bateaux
router.get('/', auth, boatController.getAllBoats);

// Route pour ajouter un bateau
// Note : J'ai enlevé '/add' pour que ça corresponde au fetch('/boats') de ton dashboard
router.post('/', auth, boatController.createBoat);

// Route pour modifier un bateau
router.put('/:id', auth, boatController.updateBoat);

// --- LA LIGNE MANQUANTE POUR L'ISSUE #6 ---
router.delete('/:id', auth, boatController.deleteBoat); 

module.exports = router;