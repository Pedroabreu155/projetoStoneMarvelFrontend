import axios from "axios";
import { getToken } from "./auth";

const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL
});

authApi.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authApi;