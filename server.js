import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8081;  // Utilisation du port dynamique sur Railway ou fallback à 8081

// Clé API incluse directement (moins sécurisé)
const PERENNIAL_API_KEY = "sk-YYcB6740bb468ff2a7737";  // Remplacez par votre clé API

app.use(express.json());
app.use(cors());

app.get("/search-plants", async (req, res) => {
  const plantName = req.query.name;

  if (!plantName) {
    return res.status(400).json({ error: "Veuillez fournir un nom de plante." });
  }

  try {
    console.log(`Recherche de la plante: ${plantName}`);
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${PERENNIAL_API_KEY}&q=${plantName}`
    );

    if (!response.ok) {
      throw new Error(`Erreur de l'API Perennial: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);  // Retourner les résultats de l'API Perennial
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Perennial:", error.message);
    res.status(500).json({ error: "Erreur lors de la recherche de plantes." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
