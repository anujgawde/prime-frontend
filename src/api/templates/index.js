import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
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
