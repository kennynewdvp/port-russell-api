const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// 1. CONFIGURATION DES VARIABLES D'ENVIRONNEMENT [cite: 2026-01-14]
dotenv.config({ path: path.join(__dirname, '../env/.env.dev') });

const app = express();

// 2. IMPORTS DES ROUTES ET MODÈLES
const User = require('./models/user'); 
const authRoutes = require('./routes/authRoutes');
const boatRoutes = require('./routes/boatRoutes');
const auth = require('./middlewares/auth');
const Boat = require('./models/boat');

// 3. MIDDLEWARES (Configuration du serveur)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use(express.static('public')); 

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4. CONNEXION MONGODB
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://kennycombegaming_db_user:fpHzE3V9L33ZZQf0@cluster0.ra3imqg.mongodb.net/port-russell?retryWrites=true&w=majority'; 

mongoose.connect(dbURI)
  .then(async () => {
    console.log('Connecté avec succès à MongoDB Atlas !');
    const users = await User.find();
    if (users.length === 0) {
        await User.create({
            name: "Russell",
            firstname: "Admin",
            email: "admin@russell.com",
            password: "password123" 
        });
        console.log('Utilisateur de test créé !');
    }
  })
  .catch((err) => console.log('Erreur de connexion MongoDB :', err));

// 5. ROUTES

// Route racine
app.get('/', (req, res) => res.redirect('/login'));

// Login
app.get('/login', (req, res) => res.render('login'));
app.use('/auth', authRoutes); 

// Dashboard (CETTE VERSION EST LA BONNE - Elle récupère les bateaux) [cite: 2026-01-20]
app.get('/dashboard', auth, async (req, res) => {
    try {
        const boats = await Boat.find(); 
        res.render('dashboard', { 
            user: "Russell",
            title: "Gestion des Spectres",
            boats: boats 
        });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des navires.");
    }
});

// API Bateaux (Issue #4)
app.use('/boats', boatRoutes);

// 6. LANCEMENT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});