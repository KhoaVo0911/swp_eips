import axios from 'axios';

const API_URL = 'http://52.74.214.224:8080/demo/api/v1';

const GetAccountApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/account`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetShopAccountApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/setStatus`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postShopAccountSetApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/setStatus/create`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAccountNotRelationApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/account/notRelation`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostShopAccountApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/setStatus`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const PostAccountApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/account`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostAccountForSaleApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/account/set`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PutAccountApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/account/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export default GetAccountApi;
