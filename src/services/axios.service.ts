import axios from "axios";
// const BASE_URL = "https://research-server.vercel.app/api/";
const BASE_URL = "http://localhost:3001/api/";

const axiosService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { BASE_URL };
export default axiosService;
