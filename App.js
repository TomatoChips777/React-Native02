import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import DrawerNavigator from './src/navigations/Drawer';

export default function App() {
  return (
    <DrawerNavigator/>
  );
}