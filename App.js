import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import DrawerNavigator from './src/navigations/Drawer';
import { AuthProvider } from './AuthContext';
import RootStack from './src/navigations/RootStack';

export default function App() {
  return (
     <AuthProvider>
          <RootStack/>
    </AuthProvider>
    // <AuthProvider>
    //   <DrawerNavigator/>
    // </AuthProvider>
  );
}