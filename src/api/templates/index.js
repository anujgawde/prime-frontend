import axios from "axios";

const BASE_URL = "https://prime-backend-six.vercel.app/api/";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllTemplates = async (userId) => {
  try {
    const userData = {
      userId: userId,
    };
    const response = await api.get(`/templates/`, {
      params: userData,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteTemplate = async (templateId, userId) => {
  const data = {
    templateId,
    userId,
  };
  const response = await api.post(`/templates/delete`, data);
  return response;
};

export const getMostUsedTemplates = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/templates/most-used`, data);
  return response;
};
