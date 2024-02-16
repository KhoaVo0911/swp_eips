import axiosClient from "./axiosClient";

const GetShopApi = async (id) => {
  try {
    const response = await axiosClient.get(`/admin/shop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetShopByUsernameApi = async (id) => {
  try {
    const response = await axiosClient.get(`/sale/info/shop/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostShopApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/shop`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutShopApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/shop/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetListOrderApi = async (id) => {
  try {
    const response = await axiosClient.get(`/general/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default GetShopApi;
