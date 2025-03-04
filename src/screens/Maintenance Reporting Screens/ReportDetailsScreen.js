import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons

const ReportDetailsScreen = ({ navigation, route }) => {
  const report = route.params?.report;

  // Handler functions for Edit and Delete
  const handleEdit = (report) => {
    navigation.navigate("Create Report", { report });
    // console.log('Edit button pressed');
  };

  const handleDelete = () => {
    console.log('Delete button pressed');
    // Add delete functionality here
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.reportDetailsImage}
          source={{
            uri: report?.image_path
              ? `http://192.168.218.3/LormaER/public/mobile-backend/uploads/${report.image_path}`
              : 'https://via.placeholder.com/300'
          }}
        />

        {/* Edit and Delete Buttons inside the image */}
        <View style={styles.buttonContainer}>
          {/* Edit Button */}
          <TouchableOpacity
            style={[
              styles.iconButton,
              styles.editButton,
              (report?.status === 'in_progress' || report?.status === 'resolved') && { backgroundColor: '#ccc' }
            ]}
            onPress={() => handleEdit(report)}
            disabled={report?.status === 'in_progress' || report?.status === 'resolved'}
          >
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            style={[
              styles.iconButton,
              styles.deleteButton,
              (report?.status === 'in_progress' || report?.status === 'resolved') && { backgroundColor: '#ccc' }
            ]}
            onPress={handleDelete}
            disabled={report?.status === 'in_progress' || report?.status === 'resolved'}
          >
            <Ionicons name="trash" size={20} color="white" />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.reportDetailsCard}>
        {/* Issue Type */}
        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Issue Type</Text>
          <Text style={styles.dataText}>
            {report?.issue_type ? report.issue_type.toLowerCase().charAt(0).toUpperCase() + report.issue_type.slice(1) : 'No data'}
          </Text>
        </View>

        {/* Location */}
        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Location</Text>
          <Text style={styles.dataText}>{report?.location || 'No data'}</Text>
        </View>

        {/* Description */}
        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Description</Text>
          <Text style={styles.dataText}>{report?.description || 'No data'}</Text>
        </View>

        {/* Status */}
        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Status</Text>
          <Text style={styles.dataText}>
            {report?.status
              ? report.status
                .toLowerCase()
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
              : 'No data'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportDetailsScreen;


const styles = StyleSheet.create({
  view: {
    padding: 15,
    backgroundColor: '#edf0ee',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  reportDetailsImage: {
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  reportDetailsCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  detailContainer: {
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 2,
  },
  dataText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',  // Green for Edit
  },
  deleteButton: {
    backgroundColor: '#F44336',  // Red for Delete
  },

});
