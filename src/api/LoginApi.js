import axiosClient from "./axiosClient";

const loginApi = async (username, password) => {
  try {
    const response = await axiosClient.post(`/general/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default loginApi;
