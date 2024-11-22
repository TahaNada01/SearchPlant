const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');

const app = express();
const port = 3001;

// Configuration Multer pour la gestion des images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Clé API Plant.id
const apiKey = 'N5NZ7GkXrrA9hovh8UN6OjfTYQr2Ygc8RnijDdn8YA9gR9EL4o';

// Fonction pour appeler l'API Plant.id
const getPlantNameByImage = async (imageBuffer) => {
  try {
    const formData = new FormData();
    formData.append('image', imageBuffer, 'image.jpg');

    const response = await axios.post(
      'https://api.plant.id/v2/identify',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Api-Key': apiKey,
        },
      }
    );

    const result = response.data;

    if (result.suggestions && result.suggestions.length > 0) {
      return result.suggestions[0].plant_name;
    } else {
      throw new Error('Plante non trouvée');
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API Plant.id:', error);
    throw new Error('Erreur de traitement de l\'image');
  }
};

// Route pour identifier la plante
app.post('/identify', upload.single('image'), async (req, res) => {
  try {
    const plantName = await getPlantNameByImage(req.file.buffer);
    res.json({ plantName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
