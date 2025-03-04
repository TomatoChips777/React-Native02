import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReportScreen from '../screens/Maintenance Reporting Screens/ReportScreen';
import CreateReportScreen from '../screens/Maintenance Reporting Screens/CreateReportScreen';
import ReportDetailsScreen from '../screens/Maintenance Reporting Screens/ReportDetailsScreen';
const Stack = createStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator initialRouteName='Report' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Report' component={ReportScreen} />
        <Stack.Screen name='Create Report' component={CreateReportScreen}/>
        <Stack.Screen name='Report Details' component={ReportDetailsScreen}/>
    </Stack.Navigator>
  )
}

export default ReportStack