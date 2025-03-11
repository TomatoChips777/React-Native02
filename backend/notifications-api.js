import axios from "react-native-axios/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.218.3:5000/api/notifications";

const getAuthHeaders = async () => {
  const userInfoString = await AsyncStorage.getItem("userInfo");

  if (!userInfoString) return {}; // Return empty if no user info is found

  try {
    const userInfo = JSON.parse(userInfoString); // Convert stored string back to object
    return userInfo?.id ? { "X-User-Id": userInfo.id } : {}; 
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return {}; // Return empty if parsing fails
  }
};


const NotificationsModel = {
  // Create Report
 getNotifications: async (userId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/get-notifications/${userId}`, { headers });
    return response;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { success: false, message: 'Failed to fetch notifications' };
  }
 },


 setNotificationToRead: async (notificationId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put(`${API_BASE_URL}/mark-notification-read/${notificationId}`, null, { headers });
    return response;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { success: false, message: 'Failed to mark notification as read' };
  }
 },

 deleteNotification: async (notificationId) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.delete(`${API_BASE_URL}/remove-notification/${notificationId}`, { headers });
    return response;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return { success: false, message: 'Failed to delete notification' };
  }
 },
};

export default NotificationsModel;
