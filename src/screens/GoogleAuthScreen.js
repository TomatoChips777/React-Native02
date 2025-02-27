import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Button, Image } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '../const/key';
import { AuthContext } from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
// import { Signin } from '../const/signin';
GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
    forceCodeForRefreshToken: true,
});

export default function GoogleAuthScreen({ navigation }) {
    const [userInfo, setUserInfo] = useState(null);
    const { setToken, setUserId } = useContext(AuthContext);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (response) {
                setUserInfo(response);
                const idToken = response.data.idToken;
                await AsyncStorage.setItem('authToken', idToken);
                const decodedToken = jwtDecode(idToken);
                setUserId(decodedToken.userId);
                setToken(idToken);
                // navigation.navigate('Drawer', { token: idToken, userInfo: response });
            } else {
                alert('Sign-in cancelled by user');
            }
        } catch (error) {
            switch (error.code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    Alert.alert('Sign-in cancelled');
                    break;
                case statusCodes.IN_PROGRESS:
                    Alert.alert('Sign-in in progress');
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    Alert.alert('Play services not available');
                    break;
                default:
                    console.log('Sign-in error', error);
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem('authToken');
            setUserInfo(null); // Clear user info on logout
            setToken('');
            setUserId('');
            Alert.alert('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

//     return (
//         <View style={styles.container}>
//                 <GoogleSigninButton
//                     style={{ width: 200, height: 70, borderRadius: 10 }}
//                     size={GoogleSigninButton.Size.Wide}
//                     color={GoogleSigninButton.Color.Dark}
//                     onPress={signIn}
//                 />
//         </View>
//     );
// }
    return (
        <View style={styles.container}>
            {!userInfo ? (
                <GoogleSigninButton
                    style={{ width: 200, height: 70, borderRadius: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            ) : (
                <View style={styles.userContainer}>
                    <Image 
                        source={{ uri: userInfo.data.user.photo }} 
                        style={styles.profileImage} 
                    />
                    <Text style={styles.userText}>
                        Welcome, {userInfo.data.user.givenName}!
                    </Text>
                    <Button title="Logout" onPress={signOut} color="red" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        alignItems: 'center',
    },
    userText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
});
