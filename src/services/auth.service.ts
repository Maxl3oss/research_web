import { ILogin } from "@interfaces/global.interface";
import axiosService from "./axios.service";

export async function FetchLogin(data: ILogin) {
  try {
    const res = await axiosService.post(`auth/login`, data);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}