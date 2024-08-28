import axios from "axios";

const BASE_URL = "https://prime-backend-six.vercel.app/api/";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getAllDocuments = async (userId) => {
  try {
    const documentConfig = {
      userId,
    };
    const response = await api.get(`/documents/`, {
      params: documentConfig,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteDocument = async (documentId, userId) => {
  const data = {
    documentId,
    userId,
  };
  const response = await api.post(`/documents/delete`, data);
  return response;
};

export const getRecentDocuments = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/documents/recent`, data);
  return response;
};

export const getAggregateDocuments = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/documents/aggregate`, data);
  return response;
};
