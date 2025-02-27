import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';
import Drawer from './Drawer';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName='GoogleAuth'
        >
            <Stack.Screen name="GoogleAuth" component={GoogleAuthScreen} />
            <Stack.Screen name="Drawer" component={Drawer} />
            
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack