import React, { useState, useEffect, useContext } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView,Modal, ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ReportModel from '../../../backend/report-api';
import { AuthContext } from '../../../AuthContext';

//For Modal
const CustomModal = ({ visible, message, type, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Ionicons 
                        name={type === 'success' ? "checkmark-circle-outline" : "close-circle-outline"} 
                        size={50} 
                        color={type === 'success' ? "green" : "red"} 
                    />
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

function CreateReportScreen({ navigation, route }) {
    const { user } = useContext(AuthContext);
    const existingReport = route.params?.report;
    // console.log(user);
    const [location, setLocation] = useState('');
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success');
    const [navigateAfterClose, setNavigateAfterClose] = useState(false);

    useEffect(() => {
        if (existingReport) {
            setLocation(existingReport.location || '');
            setIssueType(existingReport.issue_type || '');
            setDescription(existingReport.description || '');
            setImage(existingReport.image_path || null);
        }
    }, [existingReport]);

    const handleSubmit = async () => {
        if (!location || !issueType || !description) {
            // Alert.alert('Error', 'Please fill out all required fields.');
            setModalMessage('Please fill out all required fields.');
            setModalType('error');
            setModalVisible(true);
            return;
        }

        setLoading(true);

        if (existingReport) {
            const response = await ReportModel.updateReport(
                existingReport.id,
                location,
                issueType,
                description,
                image || existingReport.image_path,
                user.userId
            );

            setLoading(false);
            if (response.success) {
                setModalMessage(existingReport ? 'Your report has been updated!' : 'Your report has been submitted!');
                setModalType('success');
                setNavigateAfterClose(true);
            } else {
                setModalMessage(response.message || 'Failed to process report.');
                setModalType('error');
                setNavigateAfterClose(false);
            }
            setModalVisible(true);
        } else {
            const response = await ReportModel.createReport(location, issueType, description, image);

            setLoading(false);

            if (response.success) {
                setModalMessage(existingReport ? 'Your report has been updated!' : 'Your report has been submitted!');
                setModalType('success');
                setNavigateAfterClose(true);
            } else {
                setModalMessage(response.message || 'Failed to process report.');
                setModalType('error');
                setNavigateAfterClose(false);
            }
            setModalVisible(true);
        }
        setLoading(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>

            <Text style={styles.title}>
                <Ionicons name="create-outline" size={24} color="#28A745" /> {existingReport ? 'Edit Report' : 'Submit New Report'}
            </Text>
            {/* {image && <Image source={{ uri: `http://192.168.218.3/LormaER/public/mobile-backend/uploads/${image}` }} style={styles.imagePreview} />} */}
            {image && (
                <Image
                    source={{
                        uri: image.startsWith('file://')
                            ? image
                            : `http://192.168.218.3/LormaER/public/mobile-backend/uploads/${image}`
                    }}
                    style={styles.imagePreview}
                />
            )}

            <Text style={styles.label}>
                <Ionicons name="location-outline" size={16} color="#007bff" /> Location
            </Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., Building A, Room 101"
                value={location}
                onChangeText={setLocation}
            />

            <Text style={styles.label}>
                <Ionicons name="warning-outline" size={16} color="#fd7e14" /> Issue Type
            </Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={issueType}
                    onValueChange={(itemValue) => setIssueType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select issue type" value="" />
                    <Picker.Item label="Plumbing Issue" value="plumbing" />
                    <Picker.Item label="Electrical Problem" value="electrical" />
                    <Picker.Item label="Structural Damage" value="structural" />
                    <Picker.Item label="Cleaning Required" value="cleaning" />
                    <Picker.Item label="Safety Concern" value="safety" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>

            <Text style={styles.label}>
                <Ionicons name="create-outline" size={16} color="#28a745" /> Description
            </Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                placeholder="Provide more details about the issue..."
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.imageButtonText}>Upload Image</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.submitButtonText}>
                        <Ionicons
                            name={existingReport ? "checkmark-circle-outline" : "send-outline"}
                            size={18}
                            color="white"
                        /> {existingReport ? 'Update Report' : 'Submit Report'}
                    </Text>
                )}
            </TouchableOpacity>
            <CustomModal visible={modalVisible} message={modalMessage} type={modalType} onClose={() => {
                setModalVisible(false);
                if (navigateAfterClose) {
                    navigation.navigate("Report");
                }
            }} />
        </ScrollView>
    );
}

export default CreateReportScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 200,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 5,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 15,
    },
    imageButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        marginTop: 15,
    },
    submitButton: {
        backgroundColor: '#28A745',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Modals
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
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});