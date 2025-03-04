import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LostsAndFoundScreen = ({ navigation }) => {
    const reports = [
        // {
        //     id: '1',
        //     location: 'Building A - Floor 2',
        //     issueType: 'Lost ID Card',
        //     description: 'Lost ID card near the elevator.',
        //     status: 'resolved',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '2',
        //     location: 'Building B - Corridor',
        //     issueType: 'Broken Light',
        //     description: 'The light is flickering and needs replacement.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '3',
        //     location: 'Building C - Restroom',
        //     issueType: 'Water Leakage',
        //     description: 'Leaking pipe under the sink.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '4',
        //     location: 'Library',
        //     issueType: 'Laptop Stolen',
        //     description: 'Laptop stolen from the reading area.',
        //     status: 'in_progress',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '5',
        //     location: 'Cafeteria',
        //     issueType: 'Lost ID Card',
        //     description: 'ID card left on a table.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '6',
        //     location: 'Parking Lot',
        //     issueType: 'Broken Light',
        //     description: 'Street light not working.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '7',
        //     location: 'Gym',
        //     issueType: 'Water Leakage',
        //     description: 'Leak near the water fountain.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '8',
        //     location: 'Building D - Lobby',
        //     issueType: 'Laptop Stolen',
        //     description: 'Unattended laptop taken.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '9',
        //     location: 'Building E - Entrance',
        //     issueType: 'Lost ID Card',
        //     description: 'ID card dropped near entrance.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '10',
        //     location: 'Building F - Roof',
        //     issueType: 'Broken Light',
        //     description: 'No lights on the rooftop.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '11',
        //     location: 'Swimming Pool',
        //     issueType: 'Water Leakage',
        //     description: 'Leak detected near the pump.',
        //     status: 'in_progress',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '12',
        //     location: 'Building G - Hallway',
        //     issueType: 'Laptop Stolen',
        //     description: 'Laptop missing from bench.',
        //     status: 'pending',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '13',
        //     location: 'Building H - Office',
        //     issueType: 'Laptop Stolen',
        //     description: 'Laptop stolen from office desk.',
        //     status: 'in_progress',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
        // {
        //     id: '14',
        //     location: 'Building I - Lab',
        //     issueType: 'Laptop Stolen',
        //     description: 'Unsecured laptop taken.',
        //     status: 'resolved',
        //     imagePath: 'https://via.placeholder.com/150'
        // },
    ];


    const [selectedStatus, setSelectedStatus] = useState(null);

    const totalReports = reports.length;
    const pendingCount = reports.filter(r => r.status === 'pending').length;
    const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
    const resolvedCount = reports.filter(r => r.status === 'resolved').length;

    const filteredReports = selectedStatus
        ? reports.filter(r => r.status === selectedStatus)
        : reports;


    // Count reports by status

    const handleDetails = async (report) => {
        navigation.navigate('Report Details', { report });
    };
    const handleStatusFilter = (status) => {
        setSelectedStatus(status === selectedStatus ? null : status);
    };

    return (
        <View style={styles.view}>
            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardInsideContainer}>
                        <Icon name="file-document" size={30} color="#4CAF50" style={styles.infoCardIcon} />
                        <View style={styles.itemText}>
                            <Text style={styles.infoCardTextTitle}>Total Reports</Text>
                            <Text style={styles.infoCardTextCount}>{totalReports}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardInsideContainer}>
                        <Icon name="clock-alert" size={30} color="#FF9800" style={styles.infoCardIcon} />
                        <View style={styles.itemText}>
                            <Text style={styles.infoCardTextTitle}>Pending</Text>
                            <Text style={styles.infoCardTextCount}>{pendingCount}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardInsideContainer}>
                        <Icon name="progress-clock" size={30} color="#03A9F4" style={styles.infoCardIcon} />
                        <View style={styles.itemText}>
                            <Text style={styles.infoCardTextTitle}>In Progress</Text>
                            <Text style={styles.infoCardTextCount}>{inProgressCount}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoCardInsideContainer}>
                        <Icon name="check-circle" size={30} color="#8BC34A" style={styles.infoCardIcon} />
                        <View style={styles.itemText}>
                            <Text style={styles.infoCardTextTitle}>Resolved</Text>
                            <Text style={styles.infoCardTextCount}>{resolvedCount}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('Lost And Found List')}>
                    <Text style={styles.viewAllButtonText}>View All Lost And Found</Text></TouchableOpacity>

            <View style={styles.newReportButtonContainer}>
                <Text style={styles.myReportText}>My Reports</Text>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => navigation.navigate('Create Report')}
                >
                    <Icon name="plus-circle" size={20} color="#fff" />
                    <Text style={styles.createButtonText}> Create Report</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.statusContainer}>
                <TouchableOpacity
                    style={[
                        styles.reportStatusButton,
                        selectedStatus === 'pending' && styles.selectedButton
                    ]}
                    onPress={() => handleStatusFilter('pending')}
                >
                    <Icon name="clock-alert-outline" size={20} color="#FF9800" />
                    <Text style={[
                        styles.statusButtonText,
                        selectedStatus === 'pending' && styles.selectedButtonText
                    ]}> Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.reportStatusButton,
                        selectedStatus === 'in_progress' && styles.selectedButton
                    ]}
                    onPress={() => handleStatusFilter('in_progress')}
                >
                    <Icon name="progress-clock" size={20} color="#03A9F4" />
                    <Text style={[
                        styles.statusButtonText,
                        selectedStatus === 'in_progress' && styles.selectedButtonText
                    ]}> In Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.reportStatusButton,
                        selectedStatus === 'resolved' && styles.selectedButton
                    ]}
                    onPress={() => handleStatusFilter('resolved')}
                >
                    <Icon name="check-circle-outline" size={20} color="#8BC34A" />
                    <Text style={[
                        styles.statusButtonText,
                        selectedStatus === 'resolved' && styles.selectedButtonText
                    ]}> Resolved</Text>
                </TouchableOpacity>
            </View>
            {filteredReports.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: '#757575' }}>No reports available</Text>
                </View>
            ) : (
                <FlatList

                    data={filteredReports}
                    // data={reports}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemCard}
                            onPress={() => handleDetails(item)}
                        >
                            <View style={styles.itemContainer}>
                                <Icon
                                    name={getStatusIcon(item.status)}
                                    size={30}
                                    color={getStatusIconColor(item.status)}
                                    style={styles.itemCardIcon}
                                />
                                <View style={styles.itemText}>
                                    <Text style={styles.itemTitle}>{item.issueType}</Text>
                                    <Text>{item.location}</Text>
                                    <Text>{item.description}</Text>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                                <Icon name="chevron-right" size={25} color="#757575" />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default LostsAndFoundScreen;

// Function to get icon based on status
const getStatusIcon = (status) => {
    switch (status) {
        case 'pending':
            return 'clock-alert-outline';
        case 'in_progress':
            return 'progress-clock';
        case 'resolved':
            return 'check-circle-outline';
        default:
            return 'file-document-outline';
    }
};

// Function to get icon color based on status
const getStatusIconColor = (status) => {
    switch (status) {
        case 'pending':
            return '#FF9800';
        case 'in_progress':
            return '#03A9F4';
        case 'resolved':
            return '#8BC34A';
        default:
            return '#757575';
    }
};


const styles = StyleSheet.create({
    view: {
        padding: 15,
        backgroundColor: '#edf0ee',
        flex: 1,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    infoCard: {
        padding: 10,
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 8,
        width: '48%',
        marginBottom: 10,
    },
    infoCardIcon: {
        marginRight: 10,
    },
    infoCardInsideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myReportText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    reportStatusButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 1,
        width: '30%',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    itemCard: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderRadius: 5,
        elevation: 1,
    },
    itemCardIcon: {
        marginRight: 10,
    },
    itemText: {
        flex: 1,
    },
    statusText: {
        marginTop: 5,
        fontStyle: 'italic',
        color: '#757575',
    },
    itemTitle: {
        fontWeight: 'bold',
    },
    newReportButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    createButtonText: {
        color: '#fff',
        marginLeft: 5,
    },
    infoCardTextTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    infoCardTextCount: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    selectedButton: {
        backgroundColor: '#198754',
    },
    selectedButtonText: {
        color: '#fff',
    },
    statusButtonText: {
        marginLeft: 5,
        color: '#757575',
    },
    viewAllButton:{
        padding: 20,
        backgroundColor: '#4CAF50',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    viewAllButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', 
    }

});
