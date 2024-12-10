const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; //gets backend url from frontend/.env
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Register user here instead inline sa frontend
export const handleRegistration = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration Failed");
  }
};

export const handleLogin = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
};

export const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return "An unexpected error occurred";
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.shouldRefresh &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        //redirect to login if refresh fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
