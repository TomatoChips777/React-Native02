import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>Campus Reporting System</Text>

      {/* Bulletin Board Card */}
      <TouchableOpacity style={styles.bulletinCard} onPress={() => navigation.navigate('Details')}>
        <Ionicons name="megaphone-outline" size={50} color="#673AB7" style={styles.bulletinCardIcon} />
        <Text style={styles.bulletinCardTitle}>Bulletin Board</Text>
        <Text style={styles.bulletinCardDescription}>View announcements and updates.</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('Maintenance Report')}>
          <Ionicons name="construct-outline" size={40} color="#FF9800" style={styles.infoCardIcon} />
          <Text style={styles.infoCardTitleText}>Maintenance Reporting</Text>
          <Text style={styles.infoCardDescriptionText}>Report maintenance issues.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('Lost And Found')}>
          <Ionicons name="cube-outline" size={40} color="#2196F3" style={styles.infoCardIcon} />
          <Text style={styles.infoCardTitleText}>Lost & Found</Text>
          <Text style={styles.infoCardDescriptionText}>Report or find items.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('Borrowing')}>
          <Ionicons name="book-outline" size={40} color="#4CAF50" style={styles.infoCardIcon} />
          <Text style={styles.infoCardTitleText}>Borrowing Items</Text>
          <Text style={styles.infoCardDescriptionText}>Borrow items easily.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('IncidentReports')}>
          <Ionicons name="warning-outline" size={40} color="#F44336" style={styles.infoCardIcon} />
          <Text style={styles.infoCardTitleText}>Incident Reporting</Text>
          <Text style={styles.infoCardDescriptionText}>Report incidents safely.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    padding: 15,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  bulletinCard: {
    width: '100%',               // Full width for bulletin card
    padding: 20,
    elevation: 3,
    backgroundColor: '#EDE7F6',  // Light purple background
    // backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',        // Center content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bulletinCardIcon: {
    marginBottom: 10,
  },
  bulletinCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#673AB7',            // Darker purple for text
    textAlign: 'center',
    marginBottom: 5,
  },
  bulletinCardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',                // Two columns layout
    padding: 15,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',        // Center content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  infoCardIcon: {
    marginBottom: 10,
  },
  infoCardTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  infoCardDescriptionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
 