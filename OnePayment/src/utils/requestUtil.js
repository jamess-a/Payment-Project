import axios from "axios";
import * as yup from "yup";

const API_BASE_URL = `http://${import.meta.env.VITE_GATEWAY_HOST}:${import.meta.env.VITE_GATEWAY_PORT}`;

/**
 * ส่ง HTTP POST request
 * @param {string} endpoint
 * @param {object} data
 * @returns {Promise}
 */
export const postRequest = async (endpoint, data) => {
  try {
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

export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const patchRequest = async (endpoint, data) => {
  console.log(data)
  try {
    const response = await axios.patch(`${API_BASE_URL}${endpoint}`, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
