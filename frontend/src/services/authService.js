const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; //gets backend url from frontend/.env
const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";

//Register user here instead inline sa frontend
export const handleRegistration = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Http error! status: ${response.status}`);
  }
  return await response.json();
};

export const handleLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
};

export const handleLogout = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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
