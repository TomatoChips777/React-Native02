import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReportScreen from '../screens/ReportScreen';
import CreateReportScreen from '../screens/CreateReportScreen';

const Stack = createStackNavigator();

export default function ReportStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
        initialRouteName='ReportList'
        >
            <Stack.Screen name="ReportList" component={ReportScreen} />
            <Stack.Screen name="CreateReport" component={CreateReportScreen} />
            
        </Stack.Navigator>
    );
}
