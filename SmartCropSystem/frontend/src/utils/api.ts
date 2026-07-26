import { SoilData, CropRecommendation } from '../App';

const API_BASE_URL = 'http://localhost:5000'; // Update this to match your Flask server

export const analyzeSoil = async (soilData: SoilData): Promise<CropRecommendation> => {
  try {
    const formData = new FormData();
    
    // Convert the soil data to form data format expected by Flask
    Object.entries(soilData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // Parse the Flask response (assuming it returns HTML with the results)
    // You might need to modify this based on your Flask backend response format
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    // Extract data from the HTML response
    // This is a simplified parser - you may need to adjust based on your actual Flask template
    const cropElement = doc.querySelector('[data-crop]');
    const explanationElement = doc.querySelector('[data-explanation]');
    const waterFootprintElement = doc.querySelector('[data-water-footprint]');
    const suggestionsElement = doc.querySelector('[data-suggestions]');
    
    if (!cropElement) {
      throw new Error('Invalid response format from server');
    }

    // For now, return mock data that matches your backend structure
    // You should modify your Flask backend to return JSON instead of HTML
    const mockResponse: CropRecommendation = {
      crop: 'rice', // This should come from the actual response
      explanation: 'The recommended crop is rice because it thrives in the provided soil conditions with optimal nitrogen, phosphorus, and potassium levels.',
      water_footprint: {
        blue_water: 50.5,
        green_water: 120.3,
        grey_water: 30.2,
        total_water_footprint: 201.0
      },
      water_saving_suggestions: [
        'Use drip irrigation for more targeted water delivery.',
        'Monitor soil moisture levels to avoid over-irrigation.',
        'Use rainwater harvesting systems to collect and store water.'
      ],
      inputData: soilData
    };

    return mockResponse;
    
  } catch (error) {
    console.error('Error analyzing soil:', error);
    throw new Error('Failed to analyze soil. Please check your connection and try again.');
  }
};

// Alternative implementation for when you modify your Flask backend to return JSON
export const analyzeSoilJSON = async (soilData: SoilData): Promise<CropRecommendation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(soilData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      crop: data.crop,
      explanation: data.explanation,
      water_footprint: data.water_footprint,
      water_saving_suggestions: data.water_saving_suggestions,
      inputData: soilData
    };
    
  } catch (error) {
    console.error('Error analyzing soil:', error);
    throw new Error('Failed to analyze soil. Please check your connection and try again.');
  }
};