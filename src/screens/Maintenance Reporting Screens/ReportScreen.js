import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState, useContext, useCallback, memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import ReportModel from '../../../backend/report-api';
const ReportScreen = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const [selectedStatus, setSelectedStatus] = useState(null);

    const totalReports = reports.length;
    const pendingCount = reports.filter(r => r.status === 'pending').length;
    const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
    const resolvedCount = reports.filter(r => r.status === 'resolved').length;

    const filteredReports = selectedStatus
        ? reports.filter(r => r.status === selectedStatus)
        : reports;



    // Helper function to capitalize first letter
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Helper function to format status
    const formatStatus = (status) => {
        if (status === 'in_progress') return 'In Progress';
        return capitalizeFirstLetter(status);
    };

    // Count reports by status

    const handleDetails = async (report) => {
        navigation.navigate('Report Details', { report });
    };
    const handleStatusFilter = (status) => {
        setSelectedStatus(status === selectedStatus ? null : status);
    };
    const ReportItem = memo(({ item }) => (
        <TouchableOpacity style={styles.itemCard} onPress={() => handleDetails(item)}>
            <View style={styles.itemContainer}>
                <Icon name={getStatusIcon(item.status)} size={30} color={getStatusIconColor(item.status)} style={styles.itemCardIcon} />
                <View style={styles.itemText}>
                    <Text style={styles.itemTitle}>{capitalizeFirstLetter(item.issue_type)}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.description}</Text>
                    <Text style={styles.statusText}>{formatStatus(item.status)}</Text>
                </View>
                <Icon name="chevron-right" size={25} color="#757575" />
            </View>
        </TouchableOpacity>
    ), (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

    // const ReportItem = memo(({ item }) => (
    //     <TouchableOpacity
    //         style={styles.itemCard}
    //         onPress={() => handleDetails(item)}
    //     >
    //         <View style={styles.itemContainer}>
    //             <Icon
    //                 name={getStatusIcon(item.status)}
    //                 size={30}
    //                 color={getStatusIconColor(item.status)}
    //                 style={styles.itemCardIcon}
    //             />
    //             <View style={styles.itemText}>
    //                 <Text style={styles.itemTitle}>{capitalizeFirstLetter(item.issue_type)}</Text>
    //                 <Text>{item.location}</Text>
    //                 <Text>{item.description}</Text>
    //                 <Text style={styles.statusText}>{formatStatus(item.status)}</Text>
    //             </View>
    //             <Icon name="chevron-right" size={25} color="#757575" />
    //         </View>
    //     </TouchableOpacity>
    // ));
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
            <FlatList
                data={filteredReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ReportItem item={item} />}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
                windowSize={7}
                getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                })}
                updateCellsBatchingPeriod={50}
            />

            {/* <FlatList
                data={filteredReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ReportItem item={item} />}
                initialNumToRender={2} 
                maxToRenderPerBatch={2} 
                removeClippedSubviews={true} 
                windowSize={5} 
                getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                })}
            /> */}
        </View>
    );
};


export default ReportScreen;



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

});
