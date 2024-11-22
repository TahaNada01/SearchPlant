import express from "express";
import fetch from "node-fetch"; // Utilisation de fetch en Node.js

const app = express();
const port = 8081;

// Clé API de Perennial (vous devrez obtenir cette clé après inscription)
const PERENNIAL_API_KEY = "sk-YYcB6740bb468ff2a7737";

// Middleware pour analyser le JSON
app.use(express.json());

// Route pour rechercher une plante par son nom
app.get("/search-plants", async (req, res) => {
  const plantName = req.query.name;

  if (!plantName) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir un nom de plante." });
  }

  try {
    // Requête vers l'API Perennial
    const response = await fetch(`https://perenual.com/api/species-list?key=${PERENNIAL_API_KEY}&q=${plantName}`);
    
    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.statusText}`);
    }

    // Récupérer les données de l'API
    const data = await response.json();

    // Renvoi des résultats à l'utilisateur
    res.json(data);
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Perennial:", error.message);
    res.status(500).json({ error: "Erreur lors de la recherche de plantes." });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
