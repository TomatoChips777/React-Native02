import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'react-native-axios/lib/axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // Add user state to store user details
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        await loadUserProfile(storedToken);  // Load user profile if token exists
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (token) => {
    try {
       
        if (!token) return;

        const response = await axios.post('http://192.168.218.3/LormaER/public/mobile-backend/get-user.php', {
            idToken: token,  // Send token in request body
        });

        if (response.data.success) {
            setUser(response.data.user_data); // Set user details in context
        } else {
            console.error(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

  // const loadUserProfile = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently(); 
  //     setUser(userInfo.data.user); 
  //   } catch (error) {
  //     console.error('Error loading user profile:', error);
  //   }
  // };

  const signIn = async (newToken, userInfo) => {
    try {
      if (!newToken) {
        throw new Error('No token provided');
      }
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
      setUser(userInfo); 
      setIsAuthenticated(true);
      await loadUserProfile(newToken);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try { 
      await AsyncStorage.removeItem('authToken');
      setToken(null);
      setUser(null);  // Clear user details
      setIsAuthenticated(false);
      await GoogleSignin.signOut();  // Google sign out
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        token,
        user,  // Provide user details through context
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
