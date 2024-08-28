import axios from "axios";

const BASE_URL = "https://prime-backend-six.vercel.app/api/";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await api.post(`/auth/signup`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDocsAggregate = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/users/document-template-aggregate`, data);
  return response;
};
