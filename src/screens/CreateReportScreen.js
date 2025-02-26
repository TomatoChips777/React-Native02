import React, { useState, useEffect } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

function CreateReportScreen({ navigation, route }) {
    const existingReport = route.params?.report;
    // console.log("Existing report:", existingReport);

    // State variables (initialized as empty)
    const [location, setLocation] = useState('');
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Update the state when the report is passed in the route
    useEffect(() => {
        if (existingReport) {
            setLocation(existingReport.location || '');
            setIssueType(existingReport.issueType || '');
            setDescription(existingReport.description || '');
            setImage(existingReport.image || null);
        }
    }, [existingReport]); // Dependency array ensures this runs when `existingReport` changes

    const handleSubmit = () => {
        if (!location || !issueType || !description) {
            Alert.alert('Error', 'Please fill out all required fields.');
            return;
        }

        if (existingReport) {
            Alert.alert('Success', 'Your report has been updated!');
        } else {
            Alert.alert('Success', 'Your report has been submitted!');
        }

        navigation.goBack();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
            <Text style={styles.title}>{existingReport ? '✏️ Edit Report' : '📝 Submit New Report'}</Text>

            <Text style={styles.label}>📍 Location</Text>
            <TextInput 
                style={styles.input} 
                placeholder="e.g., Building A, Room 101" 
                value={location} 
                onChangeText={setLocation} 
            />

            <Text style={styles.label}>⚠️ Issue Type</Text>
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

            <Text style={styles.label}>📝 Description</Text>
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

            {image && (
                <Image source={{ uri: image }} style={styles.imagePreview} />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>{existingReport ? '✅ Update Report' : '📤 Submit Report'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

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
        backgroundColor: '#198754',
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
        height: 200,
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
});

export default CreateReportScreen;
