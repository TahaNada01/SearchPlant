import axios from 'axios';

// URL de votre serveur backend
const BASE_URL = 'http://localhost:3001';

// Fonction pour rechercher des plantes par nom
export const searchPlants = async (plantName) => {
  try {
    const response = await axios.get(`${BASE_URL}/plants/search`, {
      params: { query: plantName },
    });
    return response.data.plants; // Retourne les résultats sous forme de tableau
  } catch (error) {
    console.error('Erreur lors de la recherche de plantes :', error);
    throw error;
  }
};
