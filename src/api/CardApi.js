import axios from 'axios';

const API_URL = 'http://52.74.214.224:8080/demo/api/v1';

const GetCardApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/card/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostSearchCardApi = async (id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Đặt Media Type là application/json
      },
    };
    const response = await axios.post(`${API_URL}/general/cardInfo`, id, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostCardApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/card/create`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Post50CardApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/card/create50`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutCardApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/cashier/card/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutStatusCardAPi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/card/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutDepositCardApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/cashier/card/deposite`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutWithdrawCardApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/cashier/card/withdraw`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default GetCardApi;
