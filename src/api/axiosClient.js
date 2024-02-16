import axios from "axios";

axios.defaults.baseURL = "http://52.74.214.224:8080/demo/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const axiosClient = {
  get(url, params) {
    return axios.get(`${url}/${params}`).catch((error) => console.log(error));
  },
  getType(url, slug = "", params) {
    return axios
      .get(`${url}`, slug, params)
      .catch((error) => console.log(error));
  },
  getNo(url) {
    return axios.get(`${url}`).catch((error) => console.log(error));
  },
  // get2(url, params) {
  //   return axios.get(`${url}`, params).catch((error) => console.log(error));
  // },

  getWithFilter(url, params) {
    return axios.get(`${url}`, params).catch((error) => console.log(error));
  },
  getWithIdFilter(url, slug = "", params) {
    return axios
      .get(`${url}/${slug}`, params)
      .catch((error) => console.log(error));
  },
  getWithIdFilterMiddleParams(url, slug = "", params) {
    return axios
      .get(
        // `${url}/?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}/${slug}`
        `${url}`,
        { params },
        `${slug}`
      )
      .catch((error) => console.log(error));
  },

  getWithId(url, slug = "") {
    return axios.get(`${url}`, `${slug}`).catch((error) => console.log(error));
  },
  getWithIdFixBug(url, slug = "") {
    return axios.get(`${url}/${slug}`).catch((error) => console.log(error));
  },

  getWith2Id(url, slug = "", slug2 = "") {
    return axios
      .get(`${url}/${slug}/${slug2}`)
      .catch((error) => console.log(error));
  },

  getWith2IdParams(url, slug = "", slug2 = "") {
    return axios
      .get(`${url}/${slug}/${slug2}`)
      .catch((error) => console.log(error));
  },
  // getWithFilterMiddleId(url, url2, slug = "", params) {
  //   return axios
  //     .get(`${url}/${slug}/${url2}`, params)
  //     .catch((error) => console.log(error));
  // },
  // getMiddleParams(url, slug = "", url2) {
  //   return axios
  //     .get(`${url}/${slug}/${url2}`)
  //     .catch((error) => console.log(error));
  // },

  query(url) {
    return axios.get(`${url}`).catch((error) => console.log(error));
  },

  post(url, params, config) {
    return axios.post(`${url}`, params, config);
  },

  // postWithId(url, slug, params, config) {
  //   return axios.post(`${url}/${slug}`, params, config);
  // },
  // postWith2Id(url, slug = "", url2, slug2 = "", params) {
  //   return axios.post(`${url}/${slug}/${url2}/${slug2}`, params);
  // },
  // postMiddleId(url, slug, url2, params, config) {
  //   return axios.post(`${url}/${slug}/${url2}`);
  // },
  put(url, params, config) {
    return axios.put(`${url}`, params, config);
  },
  putWithId(url, slug = "", params) {
    return axios.put(`${url}`, slug, params);
  },
  putWithIdAndParams(url, slug, params) {
    return axios.put(`${url}/${slug}`, params);
  },
  // putWithMiddleId(url, slug = "", url2) {
  //   return axios.put(`${url}/${slug}/${url2}`);
  // },
  // putMiddleParams(url, params, url2, slug) {
  //   return axios.put(`${url}`, params, `${url2}`, slug);
  // },
  delete(url, params, config) {
    return axios.delete(`${url}`, params, config);
  },
  deleteWithId(url, slug = "") {
    return axios.delete(`${url}/${slug}`);
  },
  saveToken(token, expired) {
    window.localStorage.setItem("access_token", JSON.stringify(token));
  },
  getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem("access_token")
      ? JSON.parse(window.localStorage.getItem("access_token"))
      : "";
  },

  setHeaderAuth(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clearToken() {},
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
