import React, { useState, useEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const CreateLostAndFoundScreen = ({ navigation, route }) => {
    const existingItem = route?.params?.item;
    
    const [itemName, setItemName] = useState("");
    const [status, setStatus] = useState("Lost");
    const [category, setCategory] = useState("General");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (existingItem) {
            setItemName(existingItem.itemName || "");
            setStatus(existingItem.status || "Lost");
            setCategory(existingItem.category || "General");
            setDescription(existingItem.description || "");
            setLocation(existingItem.location || "");
            setContactInfo(existingItem.contactInfo || "");
            setImage(existingItem.image || null);
        }
    }, [existingItem]);

    const handleSubmit = () => {
        if (!itemName || !description || !location || !contactInfo) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }
        
        Alert.alert("Success", existingItem ? "Your item report has been updated." : "Your item has been posted.");
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
            <Text style={styles.title}>{existingItem ? "✏️ Edit Lost & Found Post" : "🆕 Post Lost/Found Item"}</Text>

            <Text style={styles.label}>🔘 Status</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={status} onValueChange={(value) => setStatus(value)} style={styles.picker}>
                    <Picker.Item label="Lost" value="Lost" />
                    <Picker.Item label="Found" value="Found" />
                </Picker>
            </View>

            <Text style={styles.label}>📌 Item Name</Text>
            <TextInput style={styles.input} placeholder="Enter item name" value={itemName} onChangeText={setItemName} />

            <Text style={styles.label}>📂 Category</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={category} onValueChange={(value) => setCategory(value)} style={styles.picker}>
                    <Picker.Item label="General" value="General" />
                    <Picker.Item label="Electronics" value="Electronics" />
                    <Picker.Item label="Documents" value="Documents" />
                    <Picker.Item label="Clothing" value="Clothing" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
            </View>

            <Text style={styles.label}>📝 Description</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Describe the item in detail" multiline value={description} onChangeText={setDescription} />

            <Text style={styles.label}>📍 Last Seen Location</Text>
            <TextInput style={styles.input} placeholder="Enter last seen location" value={location} onChangeText={setLocation} />

            <Text style={styles.label}>📞 Contact Information</Text>
            <TextInput style={styles.input} placeholder="Enter your email or phone number" value={contactInfo} onChangeText={setContactInfo} />

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Ionicons name="camera" size={20} color="white" />
                <Text style={styles.imageButtonText}>Upload Image</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>{existingItem ? "✅ Update Post" : "📤 Submit Post"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 15,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: "#f9f9f9",
    },
    textArea: {
        height: 150,
        textAlignVertical: "top",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 5,
        backgroundColor: "#f9f9f9",
    },
    picker: {
        height: 50,
    },
    imageButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#198754",
        padding: 12,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 15,
    },
    imageButtonText: {
        color: "white",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "bold",
    },
    imagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginTop: 15,
    },
    submitButton: {
        backgroundColor: "#28A745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CreateLostAndFoundScreen;
