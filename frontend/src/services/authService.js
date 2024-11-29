const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; //gets url from the .env

console.log("API_URL", API_URL);

//Register user here instead inline sa frontend
export const handleRegistration = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
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
