import axiosService from "./axios.service";

interface IChangeProfile {
  profile: string | File;
}

export async function ChangeProfileById(id: string, values: IChangeProfile) {
  try {
    const formData = Object.entries(values).reduce((formData, [key, value]) => {
      formData.append(key, value as string);
      return formData;
    }, new FormData());

    const res = await axiosService.put(`user/change-profile/${id}`, formData);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function GetProfileById(id: string) {
  try {
    const res = await axiosService.get(`user/get-profile/${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function UpdateUser(id: string, data: unknown) {
  try {
    const res = await axiosService.put(`user/update/${id}`, data);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function VerifyUserById(id: string) {
  try {
    const res = await axiosService.put(`user/managements/verify/${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}

export async function DeleteUserById(id: string) {
  try {
    const res = await axiosService.delete(`user/managements/delete-user/${id}`);
    return res.data
  } catch (err) {
    console.error("Errors : ", err);
  }
}
