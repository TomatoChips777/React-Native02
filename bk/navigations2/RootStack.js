import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../AuthContext';
import AuthStack from './AuthStack';
import Drawer from './Drawer';

const RootStack = () => {
    const { isLoading, isAuthenticated } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <Drawer /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default RootStack;