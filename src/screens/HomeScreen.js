import * as React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView style={{ padding: 15, backgroundColor: '#f5f5f5' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Campus Reporting System</Text>

            {/* Additional Display Section */}
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>📌 Important Updates</Text>
                <Text style={styles.infoText}>- Report maintenance issues and campus concerns</Text>
                <Text style={styles.infoText}>- Lost & Found office at Student Center</Text>
                <Text style={styles.infoText}>- Safety tip: Always report suspicious activities</Text>
            </View>

            {/* Report an Incident */}
            <TouchableOpacity 
                style={styles.card} 
                onPress={() => navigation.navigate('Reports')}
            >
                <Text style={styles.cardTitle}>📢 Report maintenance issues and campus concerns</Text>
                <Text style={styles.cardDesc}>Report issues like harassment, safety concerns, or campus violations.</Text>
            </TouchableOpacity>

            {/* Lost and Found */}
            <TouchableOpacity 
                style={styles.card} 
                onPress={() => navigation.navigate('Lost And Found')}
            >
                <Text style={styles.cardTitle}>🔍 Lost & Found</Text>
                <Text style={styles.cardDesc}>Report lost items or check found items on campus.</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = {
    infoCard: {
        backgroundColor: '#fffbcc',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffd700',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDesc: {
        fontSize: 14,
        color: 'gray',
    }
};

export default HomeScreen;
