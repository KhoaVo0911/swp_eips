import axiosClient from "./axiosClient";

const GetEventApi = async () => {
  try {
    const response = await axiosClient.get(`/admin/event`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEventByShopApi = async (id) => {
  try {
    const response = await axiosClient.get(`/sale/info/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEventByIdApi = async (id) => {
  try {
    const response = await axiosClient.get(`/admin/event/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetEventCashierApi = async (id) => {
  try {
    const response = await axiosClient.get(`/admin/event`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetEventImgListApi = async (id) => {
  try {
    const response = await axiosClient.get(`/general/img/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostEventApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/event`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const PostImgEventApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/image`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PutEventApi = async (body) => {
  try {
    const response = await axiosClient.post(`/admin/event/update`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default GetEventApi;
