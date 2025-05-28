import axios from 'axios';

// API key from environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather API functions
export const weatherApi = {
  // Get current weather data
  getCurrentWeather: async (cityName, unit = 'metric') => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data. Please try again.');
    }
  },
  
  // Get 5-day forecast
  getForecast: async (cityName, unit = 'metric') => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data. Please try again.');
    }
  },
  
  // Get weather by coordinates
  getWeatherByCoords: async (lat, lon, unit = 'metric') => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data by coordinates. Please try again.');
    }
  },
  
  // Get forecast by coordinates
  getForecastByCoords: async (lat, lon, unit = 'metric') => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data by coordinates. Please try again.');
    }
  }
};
