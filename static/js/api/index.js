import axios from "axios";

import { setToken, getToken, getRefreshToken } from "./token";
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  //   timeout: 30000,
  withCredentials: true,
});
instance.interceptors.request.use(async function (config) {
  const token = await getToken();
  config.headers.Authorization = "Bearer " + token;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err) => {
    const originalConfig = err.config;
    // console.log(err);
    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        const data = await refreshToken();
        if (data.success) {
          setToken(data.data.access_token, data.data.refresh_token);
          originalConfig.headers["Authorization"] =
            "Bearer " + data.data.access_token;
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + data.data.access_token;
        }

        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

async function refreshToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        access_token: await getToken(),
        refresh_token: await getRefreshToken(),
      };
      // console.log(
      // "Refresh data", data
      // )
      const res = await instance.post("auth/refresh-token", data);
      // console.log("Response data",res)
      resolve(res);
    } catch (error) {
      // if (error.response?.status === 401) {
      //     window.location.href = "/login";
      // }
      reject(error);
    }
  });
}

export default instance;
