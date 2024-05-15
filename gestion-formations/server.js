const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); // Déclaration et initialisation de 'app'


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const formationRoutes = require('./routes/formationRoutes');
app.use('/api', formationRoutes);
const formateurRoutes = require('./routes/formateurRoutes');
app.use('/api/formateurs', formateurRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nom_de_ta_base_de_donnees', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connexion à MongoDB établie avec succès !');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
