import axios from 'axios';

// API key from environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather API functions
export const weatherApi = {
  // Get current weather data
  getCurrentWeather: async (cityName, unit = 'metric') => {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  },
  
  // Get 5-day forecast
  getForecast: async (cityName, unit = 'metric') => {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  },
  
  // Get weather by coordinates
  getWeatherByCoords: async (lat, lon, unit = 'metric') => {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  },
  
  // Get forecast by coordinates
  getForecastByCoords: async (lat, lon, unit = 'metric') => {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
    );
    return response.data;
  }
};
