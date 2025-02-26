import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ReportStack from './ReportStack';
import LostAndFoundStack from './LostAndFoundStack';
import GoogleAuthScreen from '../screens/GoogleAuthScreen';
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="GoogleAuth"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#198754',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              {/* Notification Icon */}
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 15 }}>
                <Ionicons name="notifications-outline" size={24} color="white" />
              </TouchableOpacity>

              
            </View>
          ),
        })}
      >
        <Drawer.Screen name="GoogleAuth" component={GoogleAuthScreen} options={{ title: "Login" }} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Reports" component={ReportStack} />
        <Drawer.Screen name="Lost And Found" component={LostAndFoundStack} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Custom Sidebar Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* User Profile Section */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with user's profile image URL
          style={styles.drawerProfileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Sign-Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={showSignOutMenu}>
        <Ionicons name="log-out-outline" size={20} color="red" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'red' }}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

// Function to handle sign-out
const showSignOutMenu = () => {
  Alert.alert(
    "Sign Out",
    "Are you sure you want to sign out?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: () => console.log("User signed out") }
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
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
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
