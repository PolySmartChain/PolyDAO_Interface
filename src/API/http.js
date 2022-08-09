import axios from "axios";

const http = axios.create({
  // baseURL: 'https://polyjetclub-backend.polysmartchain.com/',
  baseURL: process.env.VUE_APP_BACK,
  // baseURL: "http://161.117.190.194/api/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  timeout: 50000,
});
http.interceptors.request.use(function (config) {
  if (sessionStorage.getItem("Token") != null) {
    config.headers["Authorization"] =
      "Bearer " + sessionStorage.getItem("Token");
  }
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
