import axiosService from "./axios.service";

export async function FetchTagsDDL() {
  try {
    const res = await axiosService.get(`tags/get-ddl`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}