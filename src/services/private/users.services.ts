// /managements/get-all
import axiosService from "@services/axios.service";

export async function ManagementGetUsersAll(page: number, pageSize: number, search: string) {
  try {
    const res = await axiosService.get(`user/managements/get-all?page=${page}&pageSize=${pageSize}&search=${search}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}
// /managements/get/:id
export async function ManagementGetUserById(userId: string) {
  try {
    const res = await axiosService.get(`user/managements/get/${userId}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}