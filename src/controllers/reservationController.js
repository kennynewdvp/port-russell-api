const Reservation = require('../models/reservation');
const Catway = require('../models/catway'); // On importe Catway pour vérifier son type

// --- LISTER LES RÉSERVATIONS ---
exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        
        res.render('reservations', { 
            reservations: reservations, 
            catwayNumber: req.params.id 
        });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des réservations");
    }
};

// --- CRÉER UNE RÉSERVATION ---
exports.createReservation = async (req, res) => {
    try {
        const { clientName, boatName, boatSize, checkIn, checkOut } = req.body;
        const catwayNumber = req.params.id;

        // 1. RÉCUPÉRATION DU CATWAY POUR VÉRIFIER LE TYPE (Short/Long)
        const catway = await Catway.findOne({ catwayNumber: catwayNumber });
        if (!catway) {
            return res.status(404).send("Catway non trouvé.");
        }

        // 2. VÉRIFICATION DE COMPATIBILITÉ (Logique métier)
        // Si le quai est 'Short' et le bateau est 'Long' -> ON BLOQUE
        if (catway.type === 'Short' && boatSize === 'Long') {
            return res.status(400).send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: #e67e22;">⚠️ Taille incompatible !</h2>
                    <p>Le Catway n°${catwayNumber} est de type <strong>Short</strong>.</p>
                    <p>Il ne peut pas accueillir un bateau de type <strong>Long</strong>.</p>
                    <a href="/catways/${catwayNumber}/reservations" style="color: #3498db;">Réessayer avec une taille adaptée</a>
                </div>
            `);
        }

        // 3. VÉRIFICATION DE COLLISION DE DATES (Ton code existant)
        const conflict = await Reservation.findOne({
            catwayNumber: catwayNumber,
            $or: [
                {
                    checkIn: { $lt: new Date(checkOut) },
                    checkOut: { $gt: new Date(checkIn) }
                }
            ]
        });

        if (conflict) {
            return res.status(400).send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: #e74c3c;">⚓ Accès Refusé : Collision de dates !</h2>
                    <p>Le Catway n°${catwayNumber} est déjà occupé du 
                       <strong>${new Date(conflict.checkIn).toLocaleDateString()}</strong> au 
                       <strong>${new Date(conflict.checkOut).toLocaleDateString()}</strong>.
                    </p>
                    <a href="/catways/${catwayNumber}/reservations" style="color: #3498db;">Retourner au planning</a>
                </div>
            `);
        }

        // 4. SI TOUT EST OK : On crée la réservation avec boatSize
        const newReservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            boatSize, // Nouveau champ ajouté au modèle
            checkIn,
            checkOut
        });

        await newReservation.save();
        res.redirect(`/catways/${catwayNumber}/reservations`);

    } catch (error) {
        console.error("Erreur de création :", error);
        res.status(500).send("Erreur technique lors de la vérification.");
    }
};

// --- SUPPRIMER UNE RÉSERVATION ---
exports.deleteReservation = async (req, res) => {
    try {
        const { id, id_res } = req.params;
        await Reservation.findByIdAndDelete(id_res);
        res.redirect(`/catways/${id}/reservations`);
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};