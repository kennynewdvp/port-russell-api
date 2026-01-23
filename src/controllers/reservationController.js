const Reservation = require('../models/reservation');

// --- LISTER LES RÉSERVATIONS ---
exports.getReservationsByCatway = async (req, res) => {
    try {
        // On cherche par catwayNumber (en s'assurant que c'est le bon type)
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
// --- CRÉER UNE RÉSERVATION ---
exports.createReservation = async (req, res) => {
    try {
        const { clientName, boatName, checkIn, checkOut } = req.body;
        const catwayNumber = req.params.id;

        // 1. VÉRIFICATION : Est-ce que le catway est déjà pris à ces dates ?
        const conflict = await Reservation.findOne({
            catwayNumber: catwayNumber,
            $or: [
                {
                    // Cas où une résa existante chevauche les nouvelles dates
                    checkIn: { $lt: new Date(checkOut) },
                    checkOut: { $gt: new Date(checkIn) }
                }
            ]
        });

        // 2. SI CONFLIT : On renvoie une erreur au lieu de sauvegarder
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

        // 3. SI TOUT EST OK : On crée la réservation
        const newReservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            checkIn,
            checkOut
        });

        await newReservation.save();
        res.redirect(`/catways/${catwayNumber}/reservations`);

    } catch (error) {
        console.error("Erreur de création :", error);
        res.status(500).send("Erreur technique lors de la vérification des disponibilités.");
    }
};
// --- SUPPRIMER UNE RÉSERVATION ---
exports.deleteReservation = async (req, res) => {
    try {
        // id = numéro du catway, id_res = ID unique de la résa dans MongoDB
        const { id, id_res } = req.params;
        await Reservation.findByIdAndDelete(id_res);
        
        res.redirect(`/catways/${id}/reservations`);
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};