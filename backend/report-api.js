import axios from "react-native-axios/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.218.3:5000/api/reports";

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


const ReportModel = {
  // Create Report
  createReport: async (id, location, issueType, description, imagePath) => {
    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();
      formData.append("user_id", id);
      formData.append("location", location);
      formData.append("issue_type", issueType);
      formData.append("description", description);

      if (imagePath && imagePath.startsWith("file://")) {
        const fileName = imagePath.split("/").pop();
        const fileType = imagePath.match(/\.(\w+)$/)?.[1] ?? "image";
        const file = {
          uri: imagePath,
          name: fileName,
          type: `image/${fileType}`,
        };
        formData.append("image_path", file);
      }

      const response = await axios.post(`${API_BASE_URL}/create-report`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...headers },
      });

      return response.data;
    } catch (error) {
      console.log("Create Report Error:", error.response?.data || error.message);
      return { success: false, message: "Failed to create report" };
    }
  },

   getReportsByUser: async (userId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      return { success: false, message: 'Failed to fetch reports' };
    }
  },

  // Get Report by ID
  getReportById: async (reportId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.get(`${API_BASE_URL}/${reportId}`, { headers });
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to fetch report details" };
    }
  },

  
  // Update Report
  updateReport: async (reportId, location, issueType, description, imagePath, userId) => {
    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();

      formData.append("location", location);
      formData.append("issue_type", issueType);
      formData.append("description", description);
      formData.append("user_id", userId);

      if (imagePath) {
        if (imagePath.startsWith("file://")) {
          // New image
          const fileName = imagePath.split("/").pop();
          const fileType = imagePath.match(/\.(\w+)$/)?.[1] ?? "image";
          const file = {
            uri: imagePath,
            name: fileName,
            type: `image/${fileType}`,
          };
          formData.append("image_path", file);
        } else {
          // Existing image path
          formData.append("existingImagePath", imagePath);
        }
      } else {
        formData.append("existingImagePath", "");
      }

      const response = await axios.put(`${API_BASE_URL}/${reportId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...headers },
      });

      return response.data;
    } catch (error) {
      console.log("Update Report Error:", error.response?.data || error.message);
      return { success: false, message: "Failed to update report" };
    }
  },


  deleteReport: async (reportId, userId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${API_BASE_URL}/report/${reportId}`, {
            headers,
            data: { userId },
        });
        return response.data;
    } catch (error) {
        // console.log("Error Response:", error.response?.data || error.message);
        return { success: false, message: "Failed to delete report" };
    }
},



  // Update Report Status
  updateStatus: async (reportId, status) => {
    try {
      const headers = await getAuthHeaders();
      const response = await axios.put(
        `${API_BASE_URL}/update-status`,
        { reportId, status },
        { headers }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to update status" };
    }
  },
};

export default ReportModel;
