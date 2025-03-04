import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LostAndFoundScreen from '../screens2/LostAndFoundScreen';
import LostAndFoundListScreen from '../screens2/LostAndFoundListScreen';
import CreateLostAndFoundScreen from '../screens2/CreateLostAndFoundScreen';
const Stack = createStackNavigator();

function LostAndFoundStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="LostAndFoundHome" component={LostAndFoundScreen} options={{ title: 'Lost & Found' }} />
      <Stack.Screen name="LostAndFoundList" component={LostAndFoundListScreen} options={{ title: 'Lost & Found List' }} />
      <Stack.Screen name="LostAndFoundForm" component={CreateLostAndFoundScreen} options={{ title: 'Post a lost/found item' }} />
    </Stack.Navigator>
  );
}

export default LostAndFoundStack;
