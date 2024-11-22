import express from "express";
import fetch from "node-fetch"; // Utilisation de fetch en Node.js
import cors from "cors"; // Import CORS pour gérer les requêtes cross-origin

const app = express();
const port = 8081;

// Clé API de Perennial (utilisez un gestionnaire d'environnement en production)
const PERENNIAL_API_KEY = "sk-YYcB6740bb468ff2a7737";

// Middleware pour analyser le JSON et activer CORS
app.use(express.json());
app.use(cors()); // Autoriser les requêtes cross-origin

// Route pour rechercher une plante par son nom
app.get("/search-plants", async (req, res) => {
  const plantName = req.query.name; // Récupération du paramètre `name` dans la requête

  if (!plantName) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir un nom de plante." });
  }

  try {
    console.log(`Requête reçue pour rechercher la plante: ${plantName}`);

    // Requête vers l'API Perennial
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${PERENNIAL_API_KEY}&q=${plantName}`
    );

    console.log("Statut de la réponse de l'API Perennial:", response.status);

    if (!response.ok) {
      throw new Error(
        `Erreur de l'API: ${response.status} ${response.statusText}`
      );
    }

    // Récupérer les données de l'API
    const data = await response.json();
    console.log("Données reçues de l'API Perennial:", data);

    // Renvoi des résultats à l'utilisateur
    res.json(data);
  } catch (error) {
    console.error(
      "Erreur lors de la requête à l'API Perennial:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la recherche de plantes." });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
