import axios from 'axios';

const API_URL = 'http://52.74.214.224:8080/demo/api/v1';

const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/general/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default loginApi;
