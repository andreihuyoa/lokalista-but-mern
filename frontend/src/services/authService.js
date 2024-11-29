const API_URL = import.meta.env.VITE_API_URL; //gets url from the .env

//Register user here instead inline sa frontend
export const handleRegistration = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    return await response.json();
  } catch (error) {
    throw error.message || "Something went wrong";
  }
};
