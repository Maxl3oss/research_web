import axios from "axios";
const BASE_URL = "https://research-server.vercel.app/api/";
// const BASE_URL = "http://localhost:3001/api/";

const axiosService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export { BASE_URL };
export default axiosService;