import axios from "axios";
const BASE_URL = "https://research-server-7gdnvtnmf-maxl3oss.vercel.app/api/";
// const BASE_URL = "http://localhost:3001/api/";

const axiosService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // "Content-type": "application/json",
    // Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": ["application/json;multipart/form-data;"],
  },
});

export { BASE_URL };
export default axiosService;
