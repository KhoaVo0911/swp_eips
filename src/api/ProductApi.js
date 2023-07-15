import axios from 'axios';

const API_URL = 'http://14.225.207.4:8080/demo/api/v1';

const GetProductApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/admin/productInShop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListProductApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/sale/product/all`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListProductOfSaleApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/general/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetProductSoldApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sale/checkProductSold/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostRevenueApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/general/viewRevenue`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutProductApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/sale/product/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostProductApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/sale/product/createProduct`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostComboProductApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/sale/product/createCombo`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostOrderApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/sale/order`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default GetProductApi;
