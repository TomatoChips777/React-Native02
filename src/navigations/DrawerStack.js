import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../AuthContext';
import LostAndFoundStack from './Lost&FoundStack';
import HomeStack from './HomeStack';
import ReportStack from './ReportStack';
import NotifcationScreen from '../screens/NotificationScreen';
import io from 'socket.io-client';
import NotificationsModel from '../../backend/notifications-api';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {user} = useContext(AuthContext);
  const [notificationsCount, setNotificationCount] = useState(0);

  const fetchNotifications = async () => {
      
    try{
      const response = await NotificationsModel.getNotifications(user.id);
      const unreadNotifications = response.data.filter(notification => notification.is_read === 0);

      setNotificationCount(unreadNotifications.length);
    }catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    
    fetchNotifications();

    const socket = io('http://192.168.218.3:5000');
    socket.on('update', ()=>{
      fetchNotifications();

    });

    return () => socket.disconnect();
  }, []);

  return (
    <Drawer.Navigator 
      initialRouteName="Home"
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={28} color="white" />
              {notificationsCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationsCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          </View>
        ),
      })}
    >
        <Drawer.Screen name='Home' component={HomeStack} />
        <Drawer.Screen name="Maintenance Report" component={ReportStack}/>
        <Drawer.Screen name="Lost And Found" component={LostAndFoundStack}/>
        <Drawer.Screen name="Notifications" component={NotifcationScreen}/>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { signOut, user} = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut();

      // Alert.alert('Success', 'Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Alert.alert('Error', 'Failed to sign out');
    }
  };

  const showSignOutMenu = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          onPress: handleSignOut,
          style: "destructive"
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: user?.image_url || 'https://via.placeholder.com/80' }}
          style={styles.drawerProfileImage}
        />
        <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'w2B2V@example.com'}</Text>
      </View>

      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.signOutButton} onPress={showSignOutMenu}>
        <Ionicons name="log-out-outline" size={20} color="red" style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16, color: 'red' }}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

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
        color: '#666',
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 'auto',
    },
    notificationIcon: {
      position: 'relative',
      padding: 5,
    },
    badge: {
      position: 'absolute',
      top: -3,
      right: -3,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
});

export default DrawerNavigator;
