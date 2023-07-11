import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*';

export const axiosClient = {
  getByUrl(url) {
    return axios.get(`${url}`).catch((error) => console.log(error));
  },

  get(url, slug = '') {
    return axios.get(`${url}/${slug}`).catch((error) => console.log(error));
  },

  getWithId(url, slug = '') {
    return axios.get(`${url}`, `${slug}`).catch((error) => console.log(error));
  },

  get2(url, params) {
    return axios.get(`${url}`, params).catch((error) => console.log(error));
  },

  get3(url, config) {
    return axios.get(url, config).catch((error) => console.log(error));
  },

  getWithFilter(url, slug = '', params) {
    return axios.get(`${url}/${slug}`, params).catch((error) => console.log(error));
  },

  getWithFilterMiddleId(url, slug = '', url2, params) {
    return axios.get(`${url}/${slug}/${url2}`, params).catch((error) => console.log(error));
  },

  getMiddleParams(url, slug = '', url2) {
    return axios.get(`${url}/${slug}/${url2}`).catch((error) => console.log(error));
  },

  query(url) {
    return axios.get(`${url}`).catch((error) => console.log(error));
  },

  post(url, params, config) {
    return axios.post(`${url}`, params, config);
  },
  postWithId(url, slug, params, config) {
    return axios.post(`${url}/${slug}`, params, config);
  },

  postWith2Id(url, slug = '', url2, slug2 = '', params) {
    return axios.post(`${url}/${slug}/${url2}/${slug2}`, params);
  },

  postMiddleId(url, slug, url2, params, config) {
    return axios.post(`${url}/${slug}/${url2}`);
  },

  postFile(url, params, config) {
    return axios.post(`${url}`, params, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  put(url, params, config) {
    return axios.put(`${url}`, params, config);
  },

  put2(url, body) {
    return axios.put(`${url}`, body);
  },

  putWithId(url, slug) {
    return axios.put(`${url}/${slug}`);
  },

  putWithMiddleId(url, slug = '', url2) {
    return axios.put(`${url}/${slug}/${url2}`);
  },

  putMiddleParams(url, params, url2, slug) {
    return axios.put(`${url}`, params, `${url2}`, slug);
  },

  delete(url, params, config) {
    return axios.delete(`${url}`, params, config);
  },

  deleteWithId(url, slug = '') {
    return axios.delete(`${url}/${slug}`);
  },

  delete2(url, params) {
    return axios.delete(url, params);
  },

  saveToken(token, expired) {
    window.localStorage.setItem('access_token', JSON.stringify(token));
  },

  getToken() {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem('access_token') ? JSON.parse(window.localStorage.getItem('access_token')) : '';
    // return window.localStorage.StorageKeys.TOKEN ? JSON.parse(window.localStorage.StorageKeys.TOKEN) : "";
  },

  setHeaderAuth(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clearToken() {},
};

// Add a request interceptor
axios.interceptors.request.use(
  function config(config) {
    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function response(response) {
    return response.data;
  },

  function (error) {
    // const { config, status, data } = error.response;
    // console.log('error', { status });
    // const errorMsg = data.message || {};
    // console.log(errorMsg);
    // throw new Error(errorMsg);
    return Promise.reject(error.response);
  }
);

export default axiosClient;



// // thay đổi url theo thằng back-end nó đưa
// // thay đổi trong thằng login thunk -> post(`/user/owner-login`, -> từng dấu ngoặc


// import axios from 'axios';

// axios.defaults.baseURL = '/demo/api/v1/general';

// const axiosClient = axios.create();

// axiosClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   function (response) {
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// export const getByUrl = (url) => {
//   return axiosClient.get(url);
// };

// export const get = (url, slug = '') => {
//   return axiosClient.get(`${url}/${slug}`);
// };

// export const getWithId = (url, slug = '') => {
//   return axiosClient.get(`${url}/${slug}`);
// };

// export const get2 = (url, params) => {
//   return axiosClient.get(url, { params });
// };

// export const get3 = (url, config) => {
//   return axiosClient.get(url, config);
// };

// export const getWithFilter = (url, slug = '', params) => {
//   return axiosClient.get(`${url}/${slug}`, { params });
// };

// export const getWithFilterMiddleId = (url, slug = '', url2, params) => {
//   return axiosClient.get(`${url}/${slug}/${url2}`, { params });
// };

// export const getMiddleParams = (url, slug = '', url2) => {
//   return axiosClient.get(`${url}/${slug}/${url2}`);
// };

// export const query = (url) => {
//   return axiosClient.get(url);
// };

// export const post = (url, params, config) => {
//   return axiosClient.post(url, params, config);
// };

// export const postWithId = (url, slug, params, config) => {
//   return axiosClient.post(`${url}/${slug}`, params, config);
// };

// export const postWith2Id = (url, slug = '', url2, slug2 = '', params) => {
//   return axiosClient.post(`${url}/${slug}/${url2}/${slug2}`, params);
// };

// export const postMiddleId = (url, slug, url2, params, config) => {
//   return axiosClient.post(`${url}/${slug}/${url2}`, params, config);
// };

// export const postFile = (url, params, config) => {
//   return axiosClient.post(url, params, {
//     ...config,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
// };

// export const put = (url, params, config) => {
//   return axiosClient.put(url, params, config);
// };

// export const put2 = (url, body) => {
//   return axiosClient.put(url, body);
// };

// export const putWithId = (url, slug) => {
//   return axiosClient.put(`${url}/${slug}`);
// };

// export const putWithMiddleId = (url, slug = '', url2) => {
//   return axiosClient.put(`${url}/${slug}/${url2}`);
// };

// export const putMiddleParams = (url, params, url2, slug) => {
//   return axiosClient.put(`${url}/${slug}/${url2}`, params);
// };

// export const deleteRequest = (url, params, config) => {
//   return axiosClient.delete(url, { ...config, data: params });
// };

// export const deleteWithId = (url, slug = '') => {
//   return axiosClient.delete(`${url}/${slug}`);
// };

// export const delete2 = (url, params) => {
//   return axiosClient.delete(url, { data: params });
// };

// export const saveToken = (token, expired) => {
//   window.localStorage.setItem('access_token', JSON.stringify(token));
// };

// export const getToken = () => {
//   if (typeof window === 'undefined') {
//     return null;
//   }

//   return window.localStorage.getItem('access_token')
//     ? JSON.parse(window.localStorage.getItem('access_token'))
//     : '';
// };

// export const setHeaderAuth = (token) => {
//   axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   window.localStorage.removeItem('access_token');
// };

// export default axiosClient;
