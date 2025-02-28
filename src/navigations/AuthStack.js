import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Stack.Screen name="GoogleAuth" component={GoogleAuthScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
