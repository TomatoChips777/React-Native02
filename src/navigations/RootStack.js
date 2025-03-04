import { View, Text, ActivityIndicator } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './DrawerStack';
import { AuthContext } from '../../AuthContext';
import AuthStack from './AuthStack';
const Stack = createStackNavigator();
const RootStack = () => {
    const {isLoading, isAuthenticated} = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
  return (
    <NavigationContainer>
         {isAuthenticated ? <DrawerStack/> : <AuthStack/> }
    </NavigationContainer>
  )
}

export default RootStack