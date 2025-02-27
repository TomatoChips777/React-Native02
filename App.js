import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import DrawerNavigator from './src/navigations/Drawer';
import { AuthProvider } from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <DrawerNavigator/>
    </AuthProvider>
  );
}