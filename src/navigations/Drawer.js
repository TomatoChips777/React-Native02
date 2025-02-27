import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ReportStack from './ReportStack';
import LostAndFoundStack from './LostAndFoundStack';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';
import { AuthContext } from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { token, setToken, setUserId } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName={token ? "Home" : "GoogleAuth"}
        drawerContent={(props) => token ? <CustomDrawerContent {...props} setToken={setToken} setUserId={setUserId} /> : null}
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#198754' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            token ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 15 }}>
                  <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ) : null
          ),
          drawerItemStyle: !token ? { display: 'none' } : undefined,
        })}
      >
        <Drawer.Screen 
          name="GoogleAuth" 
          component={GoogleAuthScreen} 
          options={{ title: "Login", headerShown: !token, swipeEnabled: false }} 
        />
        <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: !!token }} />
        <Drawer.Screen name="Reports" component={ReportStack} options={{ headerShown: !!token }} />
        <Drawer.Screen name="Lost And Found" component={LostAndFoundStack} options={{ headerShown: !!token }} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: !!token }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Custom Sidebar Content
function CustomDrawerContent({ setToken, setUserId, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual profile image URL
          style={styles.drawerProfileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.signOutButton} onPress={() => showSignOutMenu(setToken, setUserId)}>
        <Ionicons name="log-out-outline" size={20} color="red" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'red' }}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

// Function to handle sign-out
const showSignOutMenu = async (setToken, setUserId) => {
  Alert.alert(
    "Sign Out",
    "Are you sure you want to sign out?",
    [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Sign Out", 
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('authToken');
            setToken(null);
            setUserId(null);
          } catch (error) {
            console.error('Error signing out:', error);
          }
        } 
      }
    ]
  );
};

// Styles
const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    drawerProfileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        color: 'gray',
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 10,
    },
});

export default DrawerNavigator;
