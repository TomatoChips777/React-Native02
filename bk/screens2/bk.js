import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '../../src/const/key';
import { AuthContext } from '../../AuthContext';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
    forceCodeForRefreshToken: true,
});

export default function GoogleAuthScreen() {
    const { signIn } = useContext(AuthContext);

    const handleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            
            if (userInfo?.data?.idToken) {
                await signIn(userInfo.data.idToken);
            } else {
                Alert.alert('Error', 'Failed to get authentication token');
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
        backgroundColor: '#f0f4f8', // Soft, light background color
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',  // Dark text color for better contrast
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',  // Lighter color for the subtitle
        marginBottom: 30,
    },
    signInButton: {
        width: 300,
        height: 60,
        borderRadius: 12,  // Rounded corners for a smoother look
        marginTop: 20,
        elevation: 5,  // Adding shadow for better depth perception
    },
});
