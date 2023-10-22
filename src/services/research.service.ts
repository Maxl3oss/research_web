import { IReqResearch } from "@interfaces/global.interface";
import axiosService from "./axios.service";

export async function GetResearch(page: number, pageSize: number) {
  try {
    const res = await axiosService.get(`research/get-all?page=${page}&pageSize=${pageSize}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function GetResearchByUserId(userId: string, page: number, pageSize: number, status: number) {
  try {
    const res = await axiosService.get(`research/get/${userId}?page=${page}&pageSize=${pageSize}&status=${status}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function GetResearchDetailByUserId(userId: string, id: number) {
  try {
    const res = await axiosService.get(`research/get-detail/${userId}?id=${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function DeleteResearch(id: number) {
  try {
    const res = await axiosService.delete(`research/delete/${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function CreateResearch(values: IReqResearch) {
  try {
    const formData = Object.entries(values).reduce((formData, [key, value]) => {
      formData.append(key, value as string);
      return formData;
    }, new FormData());

    const res = await axiosService.post(`research/create`, formData);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function UpdateResearch(id: number, values: IReqResearch) {
  try {
    const formData = Object.entries(values).reduce((formData, [key, value]) => {
      formData.append(key, value);
      return formData;
    }, new FormData());

    const res = await axiosService.put(`research/update/${id}`, formData);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function RatingStarsResearch(researchId: number, data: unknown) {
  try {
    const res = await axiosService.post(`research/rating/${researchId}`, data);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}