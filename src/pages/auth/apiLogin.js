import axios from "axios";
import Cookies   from "js-cookie"

const API_BASE_URL = "http://127.0.0.1:8000"

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/doctor/auth/login`, userData);
    if (response.data.token) {
      Cookies.set("token", response.data.token, { path: "/" });
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || "An error occurred";
    throw new Error(errorMessage);
  }
};

