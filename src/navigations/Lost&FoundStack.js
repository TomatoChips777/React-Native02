import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LostAndFoundScreen from '../screens/Lost&Found Screens/LostAndFoundScreen';
import LostAndFoundListScreen from '../screens/Lost&Found Screens/LostAndFoundListScreen';

const Stack = createStackNavigator();

const LostAndFoundStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
   <Stack.Screen name='Lost&Found' component={LostAndFoundScreen} />
   <Stack.Screen name="Lost And Found List" component={LostAndFoundListScreen} />
   </Stack.Navigator>
  )
}

export default LostAndFoundStack;