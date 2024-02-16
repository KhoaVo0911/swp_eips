import axiosClient from "./axiosClient";

const GetAccountApi = async () => {
  try {
    const response = await axiosClient.get(`/admin/account`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetShopAccountApi = async () => {
  try {
    const response = await axiosClient.get(`/admin/setStatus`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postShopAccountSetApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/setStatus/create`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAccountNotRelationApi = async () => {
  try {
    const response = await axiosClient.get(`/admin/account/notRelation`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostShopAccountApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/setStatus`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const PostAccountApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/account`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostAccountForSaleApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/account/set`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutAccountApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/account/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export default GetAccountApi;
