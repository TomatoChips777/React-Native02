import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';  
import { AuthContext } from '../../../AuthContext';
import ReportModel from '../../../backend/report-api';
const ReportDetailsScreen = ({ navigation, route }) => {
  const report = route.params?.report;
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const handleEdit = (report) => {
    navigation.navigate("Create Report", { report });
  };

  const confirmDelete = (report) => {
    setReportToDelete(report);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!reportToDelete) return;
    
    try {
      const response = await ReportModel.deleteReport(reportToDelete.id, user.id);
  
      if (response.success) {
        console.log("Report deleted successfully");
        setModalVisible(false);
        navigation.goBack();  // Navigate back after deletion
      } else {
        console.log("Error: " + response.message);
      }
    } catch (error) {
      console.log("An error occurred while trying to delete the report:", error);
    }
  };

  return (
    <ScrollView style={styles.view}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.reportDetailsImage}
          source={{
            uri: report?.image_path
              ? `http://192.168.218.3:5000/uploads/${report.image_path}`
              : 'https://via.placeholder.com/300'
          }}
        />

        <View style={styles.buttonContainer}>
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

          <TouchableOpacity
            style={[
              styles.iconButton,
              styles.deleteButton,
              (report?.status === 'in_progress' || report?.status === 'resolved') && { backgroundColor: '#ccc' }
            ]}
            onPress={() => confirmDelete(report)}
            disabled={report?.status === 'in_progress' || report?.status === 'resolved'}
          >
            <Ionicons name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportDetailsCard}>
        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Issue Type</Text>
          <Text style={styles.dataText}>
            {report?.issue_type ? report.issue_type.toLowerCase().charAt(0).toUpperCase() + report.issue_type.slice(1) : 'No data'}
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Location</Text>
          <Text style={styles.dataText}>{report?.location || 'No data'}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.labelText}>Description</Text>
          <Text style={styles.dataText}>{report?.description || 'No data'}</Text>
        </View>

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

      {/* Delete Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this report?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={()=>handleDelete()}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
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
  //Modals
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.52)',

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
