import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from "react-native-axios";


const BACKEND_URL = "http://192.168.218.3/test_login/google_auth.php";

export default function GoogleAuthScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
    
            // Get Google Auth URL from PHP backend
            const response = await axios.get(BACKEND_URL);
            const { data } = response;
    
            if (!data.auth_url) {
                throw new Error("Could not get Google Auth URL");
            }
    
            // Configure authentication request
            const authRequest = new AuthSession.AuthRequest({
                redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
            });
    
            // Open browser for Google authentication
            const result = await authRequest.promptAsync(data.auth_url);
    
            if (result.type === 'success' && result.params.code) {
                // Send auth code to backend for validation
                const validateResponse = await axios.get(
                    `http://192.168.218.3/test_login/redirect.php?code=${result.params.code}`
                );
                const userData = validateResponse.data;
    
                if (userData.success) {
                    navigation.navigate('Home');
                } else {
                    throw new Error("Authentication failed");
                }
            }
        } catch (error) {
            console.error("Google Login Error:", error);
            Alert.alert(
                "Error",
                error.response?.data?.message || error.message || "Failed to connect to the server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Google Authentication</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Login with Google" onPress={handleGoogleLogin} />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});