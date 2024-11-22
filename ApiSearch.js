import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // URL de votre serveur Node.js

// Fonction pour rechercher des plantes par nom
export const searchPlantByName = async (plantName) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/search`, {
      params: {
        query: plantName,
      },
    });
    return response.data.plants; // Retourne les résultats sous forme de tableau
  } catch (error) {
    console.error('Erreur lors de la recherche de plantes via le serveur :', error);
    throw error;
  }
};
