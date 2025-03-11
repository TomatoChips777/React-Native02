import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../AuthContext';
import io from 'socket.io-client';
import NotificationsModel from '../../backend/notifications-api';

const NotificationScreen = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await NotificationsModel.getNotifications(user.id);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // const socket = io('http://192.168.218.3:5000');
    socket.on('update', fetchNotifications);

    return () => socket.disconnect();
  }, []);

  // Time formatting function
  const getTimeAgo = (timestamp) => {
    const createdAt = new Date(timestamp);
    const now = new Date();
    const differenceInSeconds = Math.floor((now - createdAt) / 1000);

    if (differenceInSeconds < 60) return `${differenceInSeconds} sec ago`;
    if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} min ago`;
    if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hrs ago`;
    if (differenceInSeconds < 2592000) return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    if (differenceInSeconds < 31536000) return `${Math.floor(differenceInSeconds / 2592000)} months ago`;
    return `${Math.floor(differenceInSeconds / 31536000)} years ago`;
  };

  // Open notification and mark as read if necessary
  const openNotification = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
    if (notification.is_read === 0) markAsRead(notification.id);
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      const response = await NotificationsModel.setNotificationToRead(id);
      if (response.success) fetchNotifications();  // Re-fetch notifications after marking as read
    } catch (error) {
      console.log("Error marking notification", error);
    }
  };

  // Remove notification
  const removeNotification = async (id) => {
    try {
      const response = await NotificationsModel.deleteNotification(id);
      if (response.success) {
        setNotifications(notifications.filter(notification => notification.id !== id));
        setModalVisible(false);
      }
    } catch (error) {
      console.log("Error removing notification", error);
    }
    setModalVisible(false);
  };

  // Render notification item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.is_read ? styles.readNotification : styles.unreadNotification]}
      onPress={() => openNotification(item)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons
          name={item.is_read ? "notifications-outline" : "notifications"}
          size={24}
          color={item.is_read ? "#aaa" : "#ff3b30"}
        />
      </View>
      <View style={styles.notificationText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
        <Text style={styles.time}>{getTimeAgo(item.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noNotifications}>No new notifications</Text>}
      />

      {/* Notification Detail Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={styles.modalMessage}>{selectedNotification?.message}</Text>
            <Text style={styles.modalTime}>{getTimeAgo(selectedNotification?.created_at)}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeNotification(selectedNotification?.id)} style={styles.remove}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 1
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  readNotification: {
    opacity: 1,
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  noNotifications: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {

    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  },
  remove: {
    padding: 10,
    backgroundColor: '#F44336',
    borderRadius: 10
  },
  removeText: {
    color: 'white',
    fontSize: 16
  }
});
