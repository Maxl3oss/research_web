import axiosService from "@services/axios.service";

export async function ManagementGetResearchAll(page: number, pageSize: number, search: string) {
  try {
    const res = await axiosService.get(`research/managements/get-all?page=${page}&pageSize=${pageSize}&search=${search}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function VerifyResearchById(id: number) {
  try {
    const res = await axiosService.post(`research/managements/verify-research/${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}
