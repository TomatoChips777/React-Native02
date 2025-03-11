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
      const storedUser = await AsyncStorage.getItem('userInfo');
      if (storedUser) {
        setIsAuthenticated(true);
        await loadUserProfile(storedUser); 
      }
    } catch (error) {
      console.error('Error loading auth:', error);
      signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (user) => {

    try {
      const response = await axios.post('http://192.168.218.3:5000/api/users/get-current-user', {
        id: user.id,
        email: user.email,
      });

      // return response.data;
      setUser(response.data);
    } catch (error) {
      // console.error('Error fetching user:', error);
      signOut();
      return null;
    }
    // try {
       
    //     if (!token) return;

    //     const response = await axios.post('http://192.168.218.3:5000/api/users/get-current-user', {
    //         id: user.id,
    //         email: user.email
    //     });

    //     if (response.data) {
    //         setUser(response.data);
    //     } else {
    //         // console.error(response.data);
    //     }
    // } catch (error) {
    //     console.error('Error fetching user profile:', error);
    // }
};

  // const loadUserProfile = async () => {
  //   try {
  //     const userInfo = await GoogleSignin.signInSilently(); 
  //     setUser(userInfo.data.user); 
  //   } catch (error) {
  //     console.error('Error loading user profile:', error);
  //   }
  // };

  const signIn = async (userInfo) => {
    const newToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1ZjgyMTE3MTM3ODhiNjE0NTQ3NGI1MDI5YjAxNDFiZDViM2RlOWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1ODA1Njg3MjEwMTYtZjY5cWlxbzgyZGhsN3N1bG1zMWY1dWJyNTB0YnJmNmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1ODA1Njg3MjEwMTYtaGFpNmkxdXBobXBlaDZqOW1vbTVpZjY2Nmg5dXY0MmIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE1MjE5NDM4MzQ1MDU0MDM0MjgiLCJlbWFpbCI6ImdvbGRlbmdyYXBlNzc3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiYW5nZWxvIGNhYmFzZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKT3hIenhTV3NFMlk5bFpibzNlaEpSdlhYZC1NZkNHM1hKcnJHY1pIalRtaUNiMGc9czk2LWMiLCJnaXZlbl9uYW1lIjoiYW5nZWxvIiwiZmFtaWx5X25hbWUiOiJjYWJhc2UiLCJpYXQiOjE3NDA5NzE2NTEsImV4cCI6MTc0MDk3NTI1MX0.H_WzaaBYNfs9x-beV7t80u5ukskMrWqvXpmYpU3FH2pSaf-_zGcmc07Vi1ESaD1Xj58V2NUBeHBGUr5GTHxLBjmsqPgD0ysS23ra91eAK3oYgRcm4KhkyW9DbVk6EfrLMZ35QwA-X-h8GaM44RbAeSfdXxWKY2dk4hScHFgfy0Qw5l4rlgu0FBHOUgYyW2V4i2GGOfwNBYdKhpxwZHfvj8zqZ-wSwgkmMrVDP_sHi2UpFME_sgBS9If2gYhI2LuIaO5bAoTcqKQrd7yHtE2XlVaafM0ZM-78-VG1mjZyKEmdeA6gKDnbGTWTD0ffYyWx7BFvr469Eejpqk_fm6P04A';
    try {
      if (!newToken) {
        throw new Error('No token provided');
      }
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setToken(newToken);
      setUser(userInfo); 
      setIsAuthenticated(true);
      await loadUserProfile(userInfo);
    } catch (error) {
      // console.error('Error signing in:', error);
      signOut();  
      throw error;
    }
  };

  const signOut = async () => {
    try { 
      await AsyncStorage.removeItem('userInfo');
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
