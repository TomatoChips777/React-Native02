import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons
import ReportModel from '../../backend/report-api';
import { AuthContext } from '../../AuthContext';

function ReportScreen() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchReports();
    // }, []);
    useFocusEffect(
        useCallback(() => {
            fetchReports();
        }, [])
    );
    const fetchReports = async () => {
        setLoading(true);
        const response = await ReportModel.getReportsByUser(user.userId);
        if (response.success) {
            setReports(response.data);
        } else {
            Alert.alert("Error", "Failed to fetch reports.");
        }
        setLoading(false);
    };

    const deleteReport = async (id) => {
        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: async () => {
                    const response = await ReportModel.deleteReport(id);
                    if (response.success) {
                        setReports(reports.filter(report => report.id !== id));
                    } else {
                        Alert.alert("Error", "Failed to delete the report.");
                    }
                }}
            ]
        );
    };

    const editReport = (report) => {
        navigation.navigate('CreateReport', { report });
    };

    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>📊 Report Summary</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total Reports: {reports.length}</Text>
                    <Text style={styles.pending}>Pending: {reports.filter(r => r.status === 'pending').length}</Text>
                    <Text style={styles.inProgress}>In Progress: {reports.filter(r => r.status === 'in_progress').length}</Text>
                    <Text style={styles.resolved}>Resolved: {reports.filter(r => r.status === 'resolved').length}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.createReportButton}
                onPress={() => navigation.navigate('CreateReport')}
            >
                <Text style={styles.createReportText}>➕ Create Report</Text>
            </TouchableOpacity>

            <Text style={styles.listTitle}>📋 Your Reports</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    data={reports}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.reportItem, getStatusStyle(item.status)]}>
                            <View style={styles.reportContent}>
                                <Text style={styles.reportTitle}>{item.issue_type}</Text>
                                <Text style={styles.reportLocation}>📍 {item.location}</Text>
                                <Text style={styles.reportDescription}>{item.description}</Text>
                                <Text style={styles.reportStatus}>Status: {item.status}</Text>
                                <Text style={styles.reportDate}>🕒 Created: {new Date(item.created_at).toLocaleString()}</Text>
                                <Text style={styles.reportDate}>🔄 Updated: {new Date(item.updated_at).toLocaleString()}</Text>
                                {item.image_path ? (
                                    <Image source={{ uri: item.image_path }} style={styles.reportImage} />
                                ) : (
                                    <Text style={styles.noImage}>📷 No Image Available</Text>
                                )}
                            </View>
                            {item.status === 'pending' && (
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => editReport(item)}>
                                        <MaterialIcons name="edit" size={20} color={"blue"}  style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteReport(item.id)}>
                                        <MaterialIcons name="delete" size={20} color={"red"} style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },

    summaryContainer: { 
        marginBottom: 20, 
        padding: 15, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    summaryBox: { padding: 10, backgroundColor: '#eee', borderRadius: 8 },
    summaryText: { fontSize: 16, fontWeight: 'bold' },
    pending: { fontSize: 14, color: '#FFC107', fontWeight: 'bold' },
    inProgress: { fontSize: 14, color: '#17A2B8', fontWeight: 'bold' },
    resolved: { fontSize: 14, color: '#28A745', fontWeight: 'bold' },

    createReportButton: { 
        backgroundColor: '#198754', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginBottom: 15,
        elevation: 3,
    },

    createReportText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    
    listTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

    reportItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 15, 
        marginVertical: 7, 
        borderRadius: 10, 
        backgroundColor: 'white',
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    reportContent: { flex: 1, marginRight: 10 },

    reportTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    reportLocation: { fontSize: 14, color: '#555', marginTop: 2 },
    reportDescription: { fontSize: 14, color: '#666', marginTop: 5 },
    reportStatus: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },

    reportDate: { fontSize: 12, color: '#777', marginTop: 5 },

    reportImage: { 
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        marginTop: 10, 
        resizeMode: 'cover',
    },

    noImage: { fontSize: 12, color: '#ccc', marginTop: 10 },

    iconContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
    
    icon: { marginHorizontal: 8 },
});

// Update getStatusStyle to change background color
const getStatusStyle = (status) => {
    switch (status) {
        case 'pending': return { backgroundColor: '#FFF3CD' }; 
        case 'in_progress': return { backgroundColor: '#D1ECF1' }; 
        case 'resolved': return { backgroundColor: '#D4EDDA' }; 
        default: return { backgroundColor: '#F8F9FA' };
    }
};

export default ReportScreen;
