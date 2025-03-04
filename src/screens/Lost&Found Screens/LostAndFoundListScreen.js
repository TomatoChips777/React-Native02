import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function LostAndFoundListScreen() {
    const { user } = useContext(AuthContext);
    // console.log(user);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const [items, setItems] = useState([
        {
            id: '1',
            category: 'Electronics',
            title: 'Lost iPhone',
            status: 'Lost',
            image: user.photo,
            description: 'Black iPhone 12 lost near the library.'
        },
        {
            id: '2',
            category: 'Clothing',
            title: 'Found Red Jacket',
            status: 'Found',
            image: user.photo,
            description: 'A red Adidas jacket found in the cafeteria.'
        },
        {
            id: '3',
            category: 'Accessories',
            title: 'Lost Wristwatch',
            status: 'Lost',
            image: user.photo,
            description: 'Silver wristwatch lost at the gym area.'
        },
        {
            id: '4',
            category: 'Documents',
            title: 'Found ID Card',
            status: 'Found',
            image: user.photo,
            description: 'A student ID card found in the parking lot.'
        },
        {
            id: '5',
            category: 'Electronics',
            title: 'Lost iPhone',
            status: 'Lost',
            image: user.photo, // Replace with actual image URL
            description: 'Black iPhone 12 lost near the library.'
        },
        {
            id: '6',
            category: 'Clothing',
            title: 'Found Red Jacket',
            status: 'Found',
            image: user.photo,
            description: 'A red Adidas jacket found in the cafeteria.'
        },
        {
            id: '7',
            category: 'Accessories',
            title: 'Lost Wristwatch',
            status: 'Lost',
            image: user.photo,
            description: 'Silver wristwatch lost at the gym area.'
        },
        {
            id: '8',
            category: 'Documents',
            title: 'Found ID Card',
            status: 'Found',
            image: user.photo,
            description: 'A student ID card found in the parking lot.'
        }, {
            id: '9',
            category: 'Electronics',
            title: 'Lost iPhone',
            status: 'Lost',
            image: user.photo, // Replace with actual image URL
            description: 'Black iPhone 12 lost near the library.'
        },
        {
            id: '10',
            category: 'Clothing',
            title: 'Found Red Jacket',
            status: 'Found',
            image: user.photo,
            description: 'A red Adidas jacket found in the cafeteria.'
        },
        {
            id: '11',
            category: 'Accessories',
            title: 'Lost Wristwatch',
            status: 'Lost',
            image: user.photo,
            description: 'Silver wristwatch lost at the gym area.'
        },
        {
            id: '12',
            category: 'Documents',
            title: 'Found ID Card',
            status: 'Found',
            image: user.photo,
            description: 'A student ID card found in the parking lot.'
        },
    ]);

    // Filtering logic
    const filteredItems = items.filter(item =>
        (filterCategory === 'All' || item.category === filterCategory) &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔍 Lost & Found</Text>

            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search items..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.createButtonContainer}>
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('Create Report')}
            >
                <Icon name="plus-circle" size={20} color="#fff" />
                <Text style={styles.createButtonText}> Create Report</Text>
            </TouchableOpacity>
            </View>
            {/* Category Filter */}
            <Picker
                selectedValue={filterCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setFilterCategory(itemValue)}
            >
                <Picker.Item label="All Categories" value="All" />
                <Picker.Item label="Electronics" value="Electronics"/>
                <Picker.Item label="Clothing" value="Clothing" />
                <Picker.Item label="Accessories" value="Accessories"/>
                <Picker.Item label="Documents" value="Documents" />
            </Picker>

            {/* List of Lost & Found Items */}
            <FlatList
                data={filteredItems}
                columnWrapperStyle={styles.cardContainer}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.infoCard, item.status === 'Lost' ? styles.lost : styles.found]}>
                        {/* <Image source={{ uri: item.image }} style={styles.infoCardImage} /> */}
                        <Image source={require('../../../assets/image-holder.jpg')} style={styles.infoCardImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemCategory}>{item.category}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text style={styles.itemStatus}>{item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Button to Post New Lost & Found Item */}
            {/* <TouchableOpacity
                style={styles.postButton}
                onPress={() => navigation.navigate('LostAndFoundForm')}
            >
                <Text style={styles.postButtonText}>➕ Post Item</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#edf0ee',

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: 50,
        marginBottom: 15,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        elevation: 1,

    },
    lost: {
        backgroundColor: '#fff',
    },
    found: {
        backgroundColor: '#fff',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    itemCategory: {
        fontSize: 14,
        color: 'black',
    },
    itemDescription: {
        fontSize: 13,
        color: 'black',
        marginBottom: 5,
    },
    itemStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    row: {
        flex: 1,
        justifyContent: 'space-between', // Ensure two items per row
    },
    infoCard: {
        width: '48%', // Two columns layout
        padding: 5,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    infoCardImage: {
        marginBottom: 10,
        height: 150,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    createButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, 
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    createButtonText: {
        color: '#fff',
        marginLeft: 5,
    },
    
});

export default LostAndFoundListScreen;
