import axios from 'axios';

const API_URL = 'http://14.225.207.4:8080/demo/api/v1';

const GetShopApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/shop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetShopByUsernameApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sale/info/shop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostShopApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/shop`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutShopApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/shop/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetListOrderApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/general/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default GetShopApi;
