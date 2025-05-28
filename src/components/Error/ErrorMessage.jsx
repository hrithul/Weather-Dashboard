import { FaExclamationTriangle } from 'react-icons/fa';
import { useWeather } from '../../context/WeatherContext';
import { useEffect } from 'react';

const ErrorMessage = () => {
  const { error, setError } = useWeather();
  
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // Clear the error state
        setError(null);
        // Clear the last searched city from localStorage
        localStorage.removeItem('lastSearchedCity');
        // Reload the window
        window.location.reload();
      }, 2000); // 5 seconds
      
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [error, setError]);
  
  if (!error) return null;
  
  // Extract the error message
  const errorMessage = error?.message || error?.toString() || 'An unknown error occurred';
  
  return (
    <div className="flex items-center bg-red-500/10 rounded-lg py-4 px-5 my-5 mx-auto max-w-lg border-l-4 border-red-500 backdrop-blur-md">
      <div className="text-red-500 text-2xl mr-4 flex items-center">
        <FaExclamationTriangle />
      </div>
      <p className="text-white m-0 text-base">{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
