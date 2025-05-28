import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { 
    user, 
    signOut, 
    favorites, 
    loadFavorites, 
    removeFavoriteCity 
  } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user, loadFavorites]);

  const handleRemoveFavorite = async (cityName) => {
    setLoading(true);
    const { error } = await removeFavoriteCity(cityName);
    if (!error) {
      await loadFavorites();
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Profile</h3>
        <button
          onClick={signOut}
          className="text-sm bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded transition-colors"
        >
          Sign Out
        </button>
      </div>
      
      <div className="text-sm mb-4 opacity-80">
        <p>{user.email}</p>
      </div>
      
      <div className="mt-4">
        <h4 className="text-md font-medium mb-2">Favorite Cities</h4>
        {loading ? (
          <p className="text-sm opacity-70">Loading favorites...</p>
        ) : favorites.length > 0 ? (
          <ul className="space-y-2">
            {favorites.map((city) => (
              <li key={city} className="flex justify-between items-center bg-white/5 p-2 rounded">
                <span>{city}</span>
                <button
                  onClick={() => handleRemoveFavorite(city)}
                  className="text-xs text-red-300 hover:text-red-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm opacity-70">No favorite cities saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
