import axios from "axios";
import * as yup from "yup";

const API_BASE_URL = `http://${import.meta.env.VITE_GATEWAY_HOST}:${import.meta.env.VITE_GATEWAY_PORT}`;

const transactionSchema = yup.object().shape({
    bank_id: yup.string()
      .matches(/^\d{10}$|^\d{13}$/, "Invalid phone number or ID format")
      .required("Bank ID is required"),
    divided: yup.number()
      .min(1, "Divided must be at least 1")
      .nullable(), 
    amount: yup.number()
      .positive("Amount must be a positive number")
      .required("Amount is required"),
    timestamp: yup.string().required("Timestamp is required"),
  });
  

/**
 * ส่ง HTTP POST request
 * @param {string} endpoint 
 * @param {object} data 
 * @returns {Promise} 
 */
export const postRequest = async (endpoint, data) => {
    try {
      // ✅ Validate ข้อมูลก่อนยิง API
      await transactionSchema.validate(data);
  
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
  
    } catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation Error:", error.message);
        throw new Error(error.message);
      }
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  };
