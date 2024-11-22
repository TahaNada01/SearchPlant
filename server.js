import axios from "axios";
import express from "express";

const app = express();
const port = 8081;

// Clé API Trefle.io (placez votre clé dans un fichier .env, par exemple TREFLE_API_KEY)
const TREFLE_API_KEY = "N5NZ7GkXrrA9hovh8UN6OjfTYQr2Ygc8RnijDdn8YA9gR9EL4o";

// Middleware pour analyser le JSON
app.use(express.json());

// Route pour rechercher une plante par nom
app.get("/search-plants", async (req, res) => {
  const plantName = req.query.name;

  if (!plantName) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir un nom de plante." });
  }

  try {
    // Appel à l'API Trefle
    const response = await axios.get("https://trefle.io/api/v1/plants/search", {
      params: {
        token: TREFLE_API_KEY,
        q: plantName,
      },
    });

    // Renvoi des résultats
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête à l'API Trefle:", error.message);
    res.status(500).json({ error: "Erreur lors de la recherche de plantes." });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
