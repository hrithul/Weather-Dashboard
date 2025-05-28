import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { weatherApi } from '../lib/weatherApi';

// Create the context
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const queryClient = useQueryClient();
  
  // Get last searched city from localStorage or default to 'Bangalore'
  const [city, setCity] = useState(() => {
    return localStorage.getItem('lastSearchedCity') || 'Bangalore';
  });
  
  // Get unit preference from localStorage or default to 'metric'
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('unitPreference') || 'metric';
  }); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Query for current weather data
  const { 
    data: weatherData, 
    isLoading: weatherLoading, 
    error: weatherError 
  } = useQuery({
    queryKey: ['currentWeather', city, unit],
    queryFn: () => weatherApi.getCurrentWeather(city, unit),
    enabled: !!city,
    refetchInterval: 30000, // 30 seconds
    staleTime: 15000, // 15 seconds
    retry: 2,
    onError: (error) => {
      console.error('Error fetching weather data:', error);
    }
  });

  // Query for forecast data
  const { 
    data: forecast, 
    isLoading: forecastLoading, 
    error: forecastError 
  } = useQuery({
    queryKey: ['forecast', city, unit],
    queryFn: () => weatherApi.getForecast(city, unit),
    enabled: !!city,
    refetchInterval: 30000, // 30 seconds
    staleTime: 15000, // 15 seconds
    retry: 2,
    onError: (error) => {
      console.error('Error fetching forecast data:', error);
    }
  });

  // Combined loading state
  const loading = weatherLoading || forecastLoading;
  
  // Combined error state
  const error = weatherError || forecastError;

  // Function to fetch weather data for a new city
  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    
    // Update city state
    setCity(cityName);
    
    // Save to localStorage
    localStorage.setItem('lastSearchedCity', cityName);
    
    // Invalidate and refetch the queries
    queryClient.invalidateQueries({ queryKey: ['currentWeather'] });
    queryClient.invalidateQueries({ queryKey: ['forecast'] });
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    // Save unit preference to localStorage
    localStorage.setItem('unitPreference', newUnit);
    
    // Invalidate and refetch the queries with the new unit
    queryClient.invalidateQueries({ queryKey: ['currentWeather'] });
    queryClient.invalidateQueries({ queryKey: ['forecast'] });
  };

  return (
    <WeatherContext.Provider
      value={{
          weatherData,
          forecast,
          loading,
          error,
          unit,
          toggleUnit,
          fetchWeatherData,
          city
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
