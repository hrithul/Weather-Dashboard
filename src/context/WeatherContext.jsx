import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const WeatherContext = createContext();

// API key from environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('Bangalore');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Always use Bangalore as the default city
  useEffect(() => {
    fetchWeatherData('Bangalore');
  
  }, []);

  // Set up polling to update weather data every 30 seconds
  useEffect(() => {
    if (!city) return;

    // Initial fetch
    fetchWeatherData(city);

    // Set up polling interval
    const intervalId = setInterval(() => {
      fetchWeatherData(city);
    }, 30000); // 30 seconds

    // Clean up interval on component unmount or when city changes
    return () => clearInterval(intervalId);
  }, [city, unit]);

  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const currentWeatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      
      setWeatherData(currentWeatherResponse.data);
      
      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      
      setForecast(forecastResponse.data);
      
      // Save to localStorage
      localStorage.setItem('lastSearchedCity', cityName);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to fetch weather data. Please try again.'
      );
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality removed as we only show Bangalore's weather

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <WeatherContext.Provider
      value={{
          weatherData,
          forecast,
          loading,
          error,
          unit,
          toggleUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
