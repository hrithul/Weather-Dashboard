import { useState } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { FaSearch } from 'react-icons/fa';
import { WiCelsius, WiFahrenheit } from 'react-icons/wi';
import { useAuth } from '../../context/AuthContext';

const SearchBar = () => {
  const { fetchWeatherData, loading, unit, toggleUnit, city } = useWeather();
  const { isAuthenticated, saveFavoriteCity } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchWeatherData(searchTerm.trim());
      setSearchTerm('');
    }
  };

  const handleSaveFavorite = async () => {
    if (!city) return;
    
    const { error } = await saveFavoriteCity(city);
    if (!error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="mb-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <form onSubmit={handleSubmit} className="flex-grow mr-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-lg bg-white/20 backdrop-blur-sm
                        border border-white/30 focus:border-white/50 outline-none
                        text-white placeholder-white/70 shadow-md"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-3 text-white/70 hover:text-white"
              disabled={loading}
            >
              <FaSearch />
            </button>
          </div>
        </form>
        
        {/* Unit Toggle Button */}
        <button
          onClick={toggleUnit}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg text-white text-xl transition-colors"
          title={unit === 'metric' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        >
          {unit === 'metric' ? <WiCelsius /> : <WiFahrenheit />}
        </button>
      </div>
      
      {/* Save Favorite Button - Only shown when user is logged in */}
      {isAuthenticated && city && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveFavorite}
            className={`text-xs px-2 py-1 rounded ${
              saveSuccess
                ? 'bg-green-500/30 text-green-100'
                : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-100'
            } transition-colors`}
            disabled={saveSuccess}
          >
            {saveSuccess ? 'Saved!' : 'Save to Favorites'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
