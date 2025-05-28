import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check for active session on initial load
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Save user's favorite cities
  const saveFavoriteCity = async (cityName) => {
    if (!user) return { error: { message: 'You must be logged in to save favorites' } };

    try {
      // First, check if the city is already in favorites
      const { data: existingFavorites, error: fetchError } = await supabase
        .from('favorite_cities')
        .select('id')
        .eq('user_id', user.id)
        .ilike('city_name', cityName);

      if (fetchError) throw fetchError;

      // If city already exists in favorites, return early with a message
      if (existingFavorites && existingFavorites.length > 0) {
        return { 
          error: { 
            message: `"${cityName}" is already in your favorites!` 
          } 
        };
      }

      // If city doesn't exist, add it to favorites
      const { data, error } = await supabase
        .from('favorite_cities')
        .insert([
          { 
            user_id: user.id, 
            city_name: cityName,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      // Refresh favorites list after adding a new one
      await loadFavorites();
      return { data };
    } catch (error) {
      console.error('Error saving favorite city:', error);
      return { 
        error: { 
          message: error.message || 'Failed to save favorite city' 
        } 
      };
    }
  };

  // Load favorites from the database
  const loadFavorites = async () => {
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    try {
      const { data, error } = await supabase
        .from('favorite_cities')
        .select('city_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Update the favorites state
      const favoritesList = data.map(item => item.city_name);
      setFavorites(favoritesList);
      return { data: favoritesList };
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
      return { error };
    }
  };
  
  // For backward compatibility
  const getFavoriteCities = async () => {
    return await loadFavorites();
  };

  // Remove a favorite city
  const removeFavoriteCity = async (cityName) => {
    if (!user) return { error: { message: 'You must be logged in to remove favorites' } };

    try {
      const { data, error } = await supabase
        .from('favorite_cities')
        .delete()
        .eq('user_id', user.id)
        .eq('city_name', cityName);

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error removing favorite city:', error);
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        saveFavoriteCity,
        getFavoriteCities,
        removeFavoriteCity,
        favorites,
        loadFavorites,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
