const express = require('express');
const bodyParser = require('body-parser'); // Pour parser le corps des requêtes POST
const axios = require('axios');

const app = express();
const port = 3001;

// Middleware pour parser les données JSON dans le corps de la requête
app.use(bodyParser.json());

// Clé API de Trefle
const trefleToken = 'BJuTakuXkBL51DzqvMTMw3Ief8lJl14l2Ye78C0L74o';

// Fonction pour rechercher des plantes par nom
const searchPlantByName = async (plantName) => {
  try {
    const response = await axios.get(`https://trefle.io/api/v1/plants/search`, {
      params: {
        token: trefleToken,
        q: plantName,
      },
    });

    // Retourne les résultats de la recherche
    return response.data.data;
  } catch (error) {
    console.error('Erreur lors de la recherche de plantes:', error);
    throw new Error('Impossible de récupérer les données des plantes.');
  }
};

// Route pour rechercher une plante
app.get('/plants/search', async (req, res) => {
  const { query } = req.query; // Le nom de la plante est passé dans les paramètres de la requête

  if (!query) {
    return res.status(400).json({ error: 'Le paramètre "query" est requis.' });
  }

  try {
    const results = await searchPlantByName(query);
    res.json({ plants: results });
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
