import axiosService from "./Axios.service";

export async function GetResearch(page: number, pageSize: number) {
    try {
        const res = await axiosService.get(`research/get-all?page=${page}&pageSize=${pageSize}`);
        return res.data
    } catch (err) {
        console.error("Errors : ", err);
    }
}