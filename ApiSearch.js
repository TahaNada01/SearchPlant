import axios from 'axios';

//
const BASE_URL = 'https://plantme-server.vercel.app';

export const identifyPlant = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const response = await axios.post(`${BASE_URL}/identify`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.plantName;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API:', error);
    throw error;
  }
};
