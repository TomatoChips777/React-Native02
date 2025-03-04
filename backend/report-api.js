import axios from "react-native-axios/lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';

const API_BASE_URL = "http://192.168.218.3/LormaER/public/mobile-backend/report-api.php";

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return token ? { Authorization: token } : {};
};

const ReportModel = {
  // createReport: async (location, issueType, description, imagePath) => {
  //   try {
  //     const headers = await getAuthHeaders();
  //     const response = await axios.post(
  //       API_BASE_URL,
  //       new URLSearchParams({
  //         action: "createReport",
  //         location,
  //         issueType,
  //         description,
  //         imagePath,
  //       }).toString(),
  //       { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return { success: false, message: "Failed to create report" };
  //   }
  // },

  createReport: async (location, issueType, description, imagePath) => {
    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();

      formData.append("action", "createReport");
      formData.append("location", location);
      formData.append("issueType", issueType);
      formData.append("description", description);


      // if (imagePath) {
      if (imagePath && imagePath.startsWith("file://")) {
        const imageUri = imagePath;
        const fileName = imageUri.split("/").pop();
        const fileType = imageUri.match(/\.(\w+)$/)?.[1] ?? "image";
        const file = {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        };
        formData.append("image", file);
      }

      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Upload error:", error.response?.data || error.message);
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

  // updateReport: async (reportId, location, issueType, description, imagePath, userId) => {
  //   try {
  //     const headers = await getAuthHeaders();
  //     const response = await axios.post(
  //       API_BASE_URL,
  //       new URLSearchParams({
  //         action: "updateReport",
  //         reportId,
  //         location,
  //         issueType,
  //         description,
  //         imagePath,
  //         userId,
  //       }).toString(),
  //       { headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers } }
  //     );
  //     // console.log(response.data.message);
  //     return response.data;
  //   } catch (error) {
  //     return { success: false, message: "Failed to update report" };
  //   }
  // },
  updateReport: async (reportId, location, issueType, description, imagePath, userId) => {
    try {
      const headers = await getAuthHeaders();
      const formData = new FormData();

      formData.append("action", "updateReport");
      formData.append("reportId", reportId);
      formData.append("location", location);
      formData.append("issueType", issueType);
      formData.append("description", description);
      formData.append("userId", userId);

      if (imagePath) {
        if (imagePath.startsWith("file://")) {
            // If imagePath is a new image URI, upload the new image
            const imageUri = imagePath;
            const fileName = imageUri.split("/").pop();
            const fileType = imageUri.match(/\.(\w+)$/)?.[1] ?? "image";
            const file = {
                uri: imageUri,
                name: fileName,
                type: `image/${fileType}`,
            };
            formData.append("image", file);
        } else {
            // If imagePath is not a new URI, treat it as an existing image path
            formData.append("existingImagePath", imagePath);
        }
    } else {
        // If no new or existing image, send an empty value to remove the image
        formData.append("existingImagePath", "");
    }
    
      // // Check if a new image is provided
      // if (imagePath && imagePath.startsWith("file://")) {
      //   const imageUri = imagePath;
      //   const fileName = imageUri.split("/").pop();
      //   const fileType = imageUri.match(/\.(\w+)$/)?.[1] ?? "image";
      //   const file = {
      //     uri: imageUri,
      //     name: fileName,
      //     type: `image/${fileType}`,
      //   };
      //   formData.append("image", file);
      // } else if (imagePath) {
      //   formData.append("existingImagePath", imagePath);
      // }


      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Update error:", error.response?.data || error.message);
      return { success: false, message: "Failed to update report" };
    }
  },

};

export default ReportModel;
