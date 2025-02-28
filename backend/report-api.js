import axios from "react-native-axios/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.218.3/LormaER/public/mobile-backend/report-api.php";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return token ? { Authorization: token } : {};
};

const ReportModel = {
  createReport: async (location, issueType, description, imagePath) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(
        API_BASE_URL,
        new URLSearchParams({
          action: "createReport",
          location,
          issueType,
          description,
          imagePath,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to create report" };
    }
  },

//   getReportsByUser: async (userId) => {
//     try {
//       const headers = await getAuthHeaders();
//       const response = await axios.get(`${API_BASE_URL}?action=getReportsByUser&userId=${userId}`, { headers });
//       return response.data;
//     } catch (error) {
//       return { success: false, message: "Failed to fetch reports" };
//     }
//   },

  getReportsByUser: async (userId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}?action=getReportsByUser&userId=${userId}`, { headers });
  
      // Ensure response format is consistent
      if (response.data.success !== false) {
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.data.message || "Failed to fetch reports" };
      }
    } catch (error) {
      return { success: false, message: "Failed to fetch reports" };
    }
  },
  

  updateStatus: async (reportId, status) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(
        API_BASE_URL,
        new URLSearchParams({
          action: "updateStatus",
          reportId,
          status,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to update status" };
    }
  },

  deleteReport: async (reportId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(
        API_BASE_URL,
        new URLSearchParams({
          action: "deleteReport",
          id: reportId,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to delete report" };
    }
  },

  getReportById: async (reportId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}?action=getReportById&reportId=${reportId}`, { headers });
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to fetch report details" };
    }
  },

  updateReport: async (reportId, location, issueType, description, imagePath, userId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.post(
        API_BASE_URL,
        new URLSearchParams({
          action: "updateReport",
          reportId,
          location,
          issueType,
          description,
          imagePath,
          userId,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
      );
      // console.log(response.data.message);
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to update report" };
    }
  },
};

export default ReportModel;
