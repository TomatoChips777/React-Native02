import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons

function ReportScreen() {
    const navigation = useNavigation();

    // Sample report data (In a real app, fetch this from a backend API)
    const [reports, setReports] = useState([
        { 
            id: '1', 
            status: 'Pending', 
            title: 'Broken Light in Hallway',
            location: 'Main Building - Hallway',
            issueType: 'electrical',
            description: 'The light in the hallway is flickering constantly.',
            image: null
        },
        { 
            id: '2', 
            status: 'In Progress', 
            title: 'Leaking Roof in Library',
            location: 'Library - Reading Room',
            issueType: 'plumbing',
            description: 'Water is dripping from the ceiling near the reading area.',
            image: null
        },
        { 
            id: '3', 
            status: 'Resolved', 
            title: 'Lost Wallet Found',
            location: 'Cafeteria',
            issueType: 'other',
            description: 'A lost wallet was found near the cafeteria entrance.',
            image: null
        },
        { 
            id: '4', 
            status: 'Pending', 
            title: 'Internet Issues in Dorm',
            location: 'Dormitory Block C',
            issueType: 'safety',
            description: 'Wi-Fi is not working in Block C for the past two days.',
            image: null
        },
    ]);
    

    // Function to delete a report
    const deleteReport = (id) => {
        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => {
                    setReports(reports.filter(report => report.id !== id));
                }}
            ]
        );
    };

    // Function to edit a report (navigates to CreateReportScreen with pre-filled data)
    const editReport = (report) => {
        navigation.navigate('CreateReport', { report });
        // console.log("Editing report:", report);
    };

    return (
        <View style={styles.container}>
            {/* Summary Section */}
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>📊 Report Summary</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total Reports: {reports.length}</Text>
                    <Text style={styles.pending}>Pending: {reports.filter(r => r.status === 'Pending').length}</Text>
                    <Text style={styles.inProgress}>In Progress: {reports.filter(r => r.status === 'In Progress').length}</Text>
                    <Text style={styles.resolved}>Resolved: {reports.filter(r => r.status === 'Resolved').length}</Text>
                </View>
            </View>

            {/* Create Report Button */}
            <TouchableOpacity
                style={styles.createReportButton}
                onPress={() => navigation.navigate('CreateReport')}
            >
                <Text style={styles.createReportText}>➕ Create Report</Text>
            </TouchableOpacity>

            {/* Reports List */}
            <Text style={styles.listTitle}>📋 Your Reports</Text>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.reportItem, getStatusStyle(item.status)]}>
                        <Text style={styles.reportTitle}>{item.title}</Text>
                        <Text style={styles.reportStatus}>{item.status}</Text>

                        {/* Action Icons - Only for Pending Reports */}
                        {item.status === 'Pending' && (
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => editReport(item)}>
                                    <MaterialIcons name="edit" size={22} color="white" style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteReport(item)}>
                                    <MaterialIcons name="delete" size={22} color="white" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

// Get background color based on status
const getStatusStyle = (status) => {
    switch (status) {
        case 'Pending': return { backgroundColor: '#FFC107' }; // Yellow
        case 'In Progress': return { backgroundColor: '#17A2B8' }; // Blue
        case 'Resolved': return { backgroundColor: '#28A745' }; // Green
        default: return {};
    }
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    summaryContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryBox: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    summaryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    pending: {
        fontSize: 14,
        color: '#FFC107',
        fontWeight: 'bold',
    },
    inProgress: {
        fontSize: 14,
        color: '#17A2B8',
        fontWeight: 'bold',
    },
    resolved: {
        fontSize: 14,
        color: '#28A745',
        fontWeight: 'bold',
    },
    createReportButton: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    createReportText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
    },
    reportTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        flex: 1, // Allows text to take up remaining space
    },
    reportStatus: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 10,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default ReportScreen;
