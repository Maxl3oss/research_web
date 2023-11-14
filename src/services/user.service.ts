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