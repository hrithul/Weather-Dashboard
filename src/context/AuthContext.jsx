import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const { data, error } = await supabase
        .from('favorite_cities')
        .upsert([
          { 
            user_id: user.id, 
            city_name: cityName,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error saving favorite city:', error);
      return { error };
    }
  };

  // Get user's favorite cities
  const getFavoriteCities = async () => {
    if (!user) return { data: [] };

    try {
      const { data, error } = await supabase
        .from('favorite_cities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data };
    } catch (error) {
      console.error('Error fetching favorite cities:', error);
      return { error };
    }
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
