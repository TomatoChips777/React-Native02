import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

function LostAndFoundScreen() {
    const navigation = useNavigation();

    const [items, setItems] = useState([
        { id: '1', status: 'Lost', title: 'Black Wallet', location: 'Library', description: 'A black leather wallet with ID and cash inside.', contact: 'John Doe - 123456789' },
        { id: '2', status: 'Found', title: 'Blue Backpack', location: 'Cafeteria', description: 'A blue Adidas backpack found near the cafeteria.', contact: 'Security Desk' },
        { id: '3', status: 'Claimed', title: 'iPhone 12', location: 'Gym', description: 'A white iPhone 12 found in the locker room.', contact: 'Admin Office' },
        { id: '4', status: 'Lost', title: 'Black Wallet', location: 'Library', description: 'A black leather wallet with ID and cash inside.', contact: 'John Doe - 123456789' },
        { id: '5', status: 'Found', title: 'Blue Backpack', location: 'Cafeteria', description: 'A blue Adidas backpack found near the cafeteria.', contact: 'Security Desk' },
        { id: '6', status: 'Claimed', title: 'iPhone 12', location: 'Gym', description: 'A white iPhone 12 found in the locker room.', contact: 'Admin Office' },
        { id: '7', status: 'Lost', title: 'Black Wallet', location: 'Library', description: 'A black leather wallet with ID and cash inside.', contact: 'John Doe - 123456789' },
        { id: '8', status: 'Found', title: 'Blue Backpack', location: 'Cafeteria', description: 'A blue Adidas backpack found near the cafeteria.', contact: 'Security Desk' },
        { id: '9', status: 'Claimed', title: 'iPhone 12', location: 'Gym', description: 'A white iPhone 12 found in the locker room.', contact: 'Admin Office' },
        { id: '10', status: 'Lost', title: 'Black Wallet', location: 'Library', description: 'A black leather wallet with ID and cash inside.', contact: 'John Doe - 123456789' },
        { id: '11', status: 'Found', title: 'Blue Backpack', location: 'Cafeteria', description: 'A blue Adidas backpack found near the cafeteria.', contact: 'Security Desk' },
        { id: '12', status: 'Claimed', title: 'iPhone 12', location: 'Gym', description: 'A white iPhone 12 found in the locker room.', contact: 'Admin Office' },
    ]);

    const deleteItem = (id) => {
        Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => {
                setItems(items.filter(item => item.id !== id));
            }}
        ]);
    };

    const editItem = (item) => {
        navigation.navigate('LostAndFoundForm', { item });
    };

    return (
        <View style={styles.container}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>📦 Lost & Found Summary</Text>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total Items: {items.length}</Text>
                    <Text style={styles.lost}>Lost: {items.filter(i => i.status === 'Lost').length}</Text>
                    <Text style={styles.found}>Found: {items.filter(i => i.status === 'Found').length}</Text>
                    <Text style={styles.claimed}>Claimed: {items.filter(i => i.status === 'Claimed').length}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('LostAndFoundForm')}>
                <Text style={styles.createButtonText}>➕ Report Lost/Found Item</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('LostAndFoundList')}>
                <Text style={styles.viewAllButtonText}>📜 View All Lost & Found Items</Text>
            </TouchableOpacity>

            <Text style={styles.listTitle}>📋 Recent Lost & Found Items</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.itemCard, getStatusStyle(item.status)]}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemStatus}>{item.status}</Text>

                        {item.status !== 'Claimed' && (
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => editItem(item)}>
                                    <MaterialIcons name="edit" size={22} color="white" style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteItem(item.id)}>
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

const getStatusStyle = (status) => {
    switch (status) {
        case 'Lost': return { backgroundColor: '#DC3545' };
        case 'Found': return { backgroundColor: '#007BFF' };
        case 'Claimed': return { backgroundColor: '#28A745' };
        default: return {};
    }
};

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
    lost: {
        fontSize: 14,
        color: '#DC3545',
        fontWeight: 'bold',
    },
    found: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    },
    claimed: {
        fontSize: 14,
        color: '#28A745',
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#198754',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewAllButton: {
        backgroundColor: '#17a2b8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    viewAllButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    itemStatus: {
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

export default LostAndFoundScreen;
