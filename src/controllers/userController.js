/**
 * @file Contrôleur pour la gestion des utilisateurs (employés) et de l'authentification.
 * @module controllers/userController
 */

const User = require('../models/user');
const Reservation = require('../models/reservation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// On utilise la même clé que dans le middleware pour que la vérification marche [cite: 2026-01-14, 2026-01-20]
const SECRET_KEY = 'Russell_Port_Safety_Key2026!@#_Security_Project'; 

/**
 * Connecte un utilisateur et génère un cookie JWT contenant le RÔLE.
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Email ou mot de passe incorrect");
        }

        // CRUCIAL : On ajoute 'role' dans le token pour que le middleware isAdmin fonctionne [cite: 2026-01-15]
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email, 
                role: user.role 
            }, 
            SECRET_KEY, 
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard'); 

    } catch (error) {
        res.status(500).send("Erreur de connexion");
    }
};

/**
 * Déconnecte l'utilisateur en supprimant le cookie.
 */
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

/**
 * Crée un nouvel utilisateur avec mot de passe haché.
 */
exports.createUser = async (req, res) => {
    try {
        const { name, firstname, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            firstname,
            email,
            password: hashedPassword,
            role: role || 'user' // Permet de choisir le rôle à la création [cite: 2026-01-15]
        });

        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        res.status(400).send("Erreur lors de la création (Email déjà utilisé ?)");
    }
};

/**
 * Récupère tous les utilisateurs pour la vue admin.
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        res.status(500).send("Erreur serveur");
    }
}

/**
 * Supprime un utilisateur par son ID.
 */
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).send("Erreur lors de la suppression");
    }
};

/**
 * Affiche le tableau de bord.
 */
exports.getDashboard = async (req, res) => {
    try {
        const allReservations = await Reservation.find();
        res.render('dashboard', { 
            // On passe le vrai nom de l'utilisateur connecté à la vue
            user: req.user ? req.user.email : 'Utilisateur', 
            boats: allReservations 
        });
    } catch (error) {
        res.status(500).send("Erreur chargement dashboard");
    }
};

/**
 * Modifie les informations d'un utilisateur.
 */
exports.updateUser = async (req, res) => {
    try {
        const { name, firstname, email, role } = req.body;
        await User.findByIdAndUpdate(req.params.id, { name, firstname, email, role });
        res.redirect('/users');
    } catch (error) {
        res.status(400).send("Erreur lors de la modification");
    }
};