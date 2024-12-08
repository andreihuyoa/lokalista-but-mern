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

  //Store token and role
  setToken(data.token);
  setRole(data.role);
};

export const setToken = (token) => {
  localStorage.getItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const handleLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};
