const User = require('../models/user');
const Reservation = require('../models/reservation'); // INDISPENSABLE pour voir le Titanic
const jwt = require('jsonwebtoken');

// --- LOGIN (Connexion) ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Recherche de l'utilisateur
        const user = await User.findOne({ email });
        
        // 2. Vérification
        if (!user || user.password !== password) {
            return res.status(401).send("Email ou mot de passe incorrect");
        }

        // 3. Génération du token (méthode prof : SECRET_KEY en clair) [cite: 2026-01-14]
        const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '24h' });
        
        // 4. Stockage dans un cookie
        res.cookie('token', token, { httpOnly: true });

        // 5. RÉCUPÉRATION DES RÉSERVATIONS POUR LE DASHBOARD
        // On va chercher toutes les réservations en base pour les afficher sur l'accueil
        const allReservations = await Reservation.find();

        // 6. RENDU DU DASHBOARD
        // On remplace 'boats: []' par 'boats: allReservations'
        res.render('dashboard', { 
            user: user.name, 
            boats: allReservations 
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur de connexion");
    }
};

// --- LOGOUT (Déconnexion) ---
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

// --- LISTER LES UTILISATEURS (Point 3.3) ---
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération");
    }
};

// --- AJOUTER UN UTILISATEUR (Point 3.3) ---
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        res.status(400).send("Erreur lors de la création");
    }
};

// --- MODIFIER UN UTILISATEUR (Point 3.3) ---
exports.updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/users');
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};

// --- SUPPRIMER UN UTILISATEUR (Point 5) ---
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};


exports.getDashboard = async (req, res) => {
    try {
        const Reservation = require('../models/reservation');
        const allReservations = await Reservation.find();
        
        // On rend la page avec les vraies données
        res.render('dashboard', { 
            user: 'Capitaine Russell', // Ou récupère le nom via la session si tu l'as configurée
            boats: allReservations 
        });
    } catch (error) {
        res.status(500).send("Erreur lors du chargement du dashboard");
    }
};