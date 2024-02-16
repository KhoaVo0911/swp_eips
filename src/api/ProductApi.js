import axiosClient from "./axiosClient";

const GetProductApi = async (id) => {
  try {
    const response = await axiosClient.get(`/admin/productInShop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListProductApi = async (body) => {
  try {
    //const response = await axios.post(`/sale/product/all`, body);
    const response = await axiosClient.get(`/general/${body}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListOrderByEventApi = async (id) => {
  try {
    //const response = await axios.post(`/sale/product/all`, body);
    const response = await axiosClient.get(`/admin/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListOrderByShopApi = async (body) => {
  try {
    //const response = await axios.post(`/sale/product/all`, body);
    const response = await axiosClient.post(`/sale/infoOrder`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetListProductOfSaleApi = async (id) => {
  try {
    const response = await axiosClient.get(`/general/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetProductSoldApi = async (id) => {
  try {
    const response = await axiosClient.get(`/sale/checkProductSold/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostRevenueApi = async (body) => {
  try {
    const response = await axiosClient.post(`/general/viewRevenue`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutProductApi = async (body) => {
  try {
    const response = await axiosClient.post(`/sale/product/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostProductApi = async (body) => {
  try {
    const response = await axiosClient.post(`/sale/product/createProduct`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostComboProductApi = async (body) => {
  try {
    const response = await axiosClient.post(`/sale/product/createCombo`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostOrderApi = async (body) => {
  try {
    const response = await axiosClient.post(`/sale/order`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default GetProductApi;
