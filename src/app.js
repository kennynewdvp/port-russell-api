const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// --- CHARGEMENT DES VARIABLES D'ENVIRONNEMENT ---
dotenv.config({ path: path.join(__dirname, 'env', '.env.dev') }); 

const app = express();

// --- CONFIGURATION DU MOTEUR DE VUE ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Gestion des fichiers statiques
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- CONNEXION MONGODB ---
// Utilise la variable d'environnement ou la clé de secours 
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://kennycombegaming_db_user:Ukgk6nhR3uEbMZdW@cluster0.ra3imqg.mongodb.net/port-russell';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connexion à MongoDB réussie (Port-Russell) !'))
    .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// --- ROUTES ---
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

// --- GESTION DES ERREURS 404 ---
app.use((req, res) => {
    res.status(404).send("Page non trouvée ! Vérifiez votre URL.");
});

// --- LANCEMENT DU SERVEUR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur Russell lancé sur http://localhost:${PORT}`);
});