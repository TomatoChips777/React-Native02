import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';


const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name='Home Stack' component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen}/>
    </Stack.Navigator>
  )
}

export default HomeStack