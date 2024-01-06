import axiosService from "@services/axios.service";

export async function GetDashboard() {
  try {
    const res = await axiosService.get(`research/managements/get-dashboard`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}