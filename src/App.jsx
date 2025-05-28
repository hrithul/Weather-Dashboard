import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WeatherProvider } from './context/WeatherContext';
import { AuthProvider } from './context/AuthContext';
import WeatherCard from './components/Weather/WeatherCard';
import ErrorMessage from './components/Error/ErrorMessage';
import LoadingSpinner from './components/Weather/LoadingSpinner';
import { useWeather } from './context/WeatherContext';
import AuthForm from './components/Auth/AuthForm';
import UserProfile from './components/Auth/UserProfile';
import { useAuth } from './context/AuthContext';

// Weather Dashboard Component
const WeatherDashboard = () => {
  const { loading, error } = useWeather();
  const { user, loading: authLoading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  
  // Show the profile button only when not loading and no errors
  const showProfileButton = !authLoading && !loading && !error;

  return (
    <div className="w-full max-w-2xl">
      <ErrorMessage />
      
      {/* Auth Status - Only show when not loading and no errors */}
      {showProfileButton && (
        <div className="flex justify-end mb-4">
          {user ? (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-white transition-colors "
            >
              {showProfile ? 'Hide Profile' : 'Show Profile'}
            </button>
          ) : (
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-white transition-colors absolute top-2 right-2"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
      
      {/* Profile or Auth Form */}
      {showProfile && (
        <div className="mb-6">
          {user ? <UserProfile /> : <AuthForm />}
        </div>
      )}
      
      {error ? (
        <div className="text-center text-red-500 p-4 bg-white/10 rounded-lg">
          <p>Error loading weather data. Please try again.</p>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <WeatherCard />
      )}
    </div>
  );
};

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#193177] via-[#93c5fd] to-[#c6f6d5] flex justify-center items-center p-5 font-poppins">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WeatherProvider>
            <WeatherDashboard />
          </WeatherProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
