import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8081;

// Clé API incluse directement (moins sécurisé)
const PERENNIAL_API_KEY = "sk-YYcB6740bb468ff2a7737";

app.use(express.json());
app.use(cors());

app.get("/search-plants", async (req, res) => {
  const plantName = req.query.name;

  if (!plantName) {
    return res.status(400).json({ error: "Veuillez fournir un nom de plante." });
  }

  try {
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${PERENNIAL_API_KEY}&q=${plantName}`
    );

    if (!response.ok) {
      throw new Error(`Erreur de l'API: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Perennial:", error.message);
    res.status(500).json({ error: "Erreur lors de la recherche de plantes." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
