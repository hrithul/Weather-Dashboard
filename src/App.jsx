import { useEffect } from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherCard from './components/Weather/WeatherCard';
import ErrorMessage from './components/Error/ErrorMessage';
import LoadingSpinner from './components/Weather/LoadingSpinner';
import { useWeather } from './context/WeatherContext';

// Weather Dashboard Component
const WeatherDashboard = () => {
  const { loading } = useWeather();

  return (
    <div className="w-full max-w-2xl">
      <ErrorMessage />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <WeatherCard />
        </>
      )}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#193177] via-[#93c5fd] to-[#c6f6d5] flex justify-center items-center p-5 font-poppins">
      <WeatherProvider>
        <WeatherDashboard />
      </WeatherProvider>
    </div>
  );
}

export default App;
