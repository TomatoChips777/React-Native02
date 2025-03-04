import React, { useState, useContext, use } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '../../src/const/key';
import { AuthContext } from '../../AuthContext';
import axios from 'react-native-axios/lib/axios';
GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
    forceCodeForRefreshToken: true,
});

export default function LoginScreen() {
    const { signIn } = useContext(AuthContext);

    const handleSignIn = async () => {
        try {
            // Ensure Google Play services are available
            await GoogleSignin.hasPlayServices();
            
            // Sign in via Google
            const userInfo = await GoogleSignin.signIn();
            // console.log(userInfo.data.idToken);
            
            if (userInfo?.data?.idToken) {
                // Send the ID token to the backend for authentication
                const response = await axios.post('http://192.168.218.3/LormaER/public/mobile-backend/mobile-login.php', {
                    email: userInfo.data.user.email,
                    name: userInfo.data.user.name,
                    picture: userInfo.data.user.photo,
                    idToken: userInfo.data.idToken
                });
                if (response.data.success) {
                    // If backend login is successful, use the token received
                    await signIn(response.data.token, response.data.user_data);  // Assuming `userId` is returned from backend
                } else {
                    console.log(userInfo.data.idToken);
                    Alert.alert('Error', response.data.message || 'Failed to authenticate');
                }
            } else {
                Alert.alert('Error', 'Failed to get authentication token');
            }
        } catch (error) {
            // Handle errors such as sign-in cancellation or Play Services issues
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
                    Alert.alert('Sign-in error', error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Lorma!</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
            <GoogleSigninButton
                style={styles.signInButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleSignIn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    signInButton: {
        width: 300,
        height: 60,
        borderRadius: 12,
        marginTop: 20,
        elevation: 5,
    },
});
