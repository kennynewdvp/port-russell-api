const mongoose = require('mongoose');
const User = require('./models/user'); 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const boatRoutes = require('./routes/boatRoutes');
const auth = require('./middlewares/auth'); // Import du gardien

// --- CONNEXION BASE DE DONNÉES ---
const dbURI = 'mongodb+srv://kennycombegaming_db_user:fpHzE3V9L33ZZQf0@cluster0.ra3imqg.mongodb.net/port-russell?retryWrites=true&w=majority'; 

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
    } else {
        console.log('L’utilisateur admin existe déjà.');
    }
  })
  .catch((err) => console.log('Erreur de connexion MongoDB :', err));

// --- MIDDLEWARES (Configuration) ---
app.use(express.json()); 
app.use(cookieParser()); 

// --- ROUTES ---

// 1. Routes publiques (Login)
app.use('/auth', authRoutes); 
app.use('/boats', boatRoutes);

// Configuration du moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

// 2. Route protégée (Dashboard) 
// Le middleware 'auth' vérifie ton Token et ta SECRET_KEY avant de laisser passer
app.get('/dashboard', auth, (req, res) => {
    res.status(200).json({ 
        message: "Bienvenue sur le tableau de bord du port, Russell !",
        userData: req.user // Affiche les infos décodées du Token
    });
});

// --- LANCEMENT DU SERVEUR (Toujours en dernier !) ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});