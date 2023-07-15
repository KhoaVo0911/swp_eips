import axios from 'axios';

const API_URL = 'http://14.225.207.4:8080/demo/api/v1';

const GetEventApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/event`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEventByShopApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sale/info/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEventImgListApi = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/general/img/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostEventApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/event`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PutEventApi = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/admin/event/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default GetEventApi;
