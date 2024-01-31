import axiosService from "./axios.service";

export type ReqComment = {
  research_id: number,
  user_id: string,
  contents: string,
}

export async function GetComments(pageSize: number, currentPage: number, researchId: number) {
  try {
    const res = await axiosService.get(`research/get-comments/${researchId}?pageSize=${pageSize}&currentPage=${currentPage}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function CreateComment(data: ReqComment) {
  try {
    const res = await axiosService.post(`research/create-comment`, data);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}