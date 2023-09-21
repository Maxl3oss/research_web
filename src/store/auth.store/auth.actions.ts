import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosService from "../../services/axios.service";
import { SignInUserArgs, UserInfo } from "./auth.interface";


function processData(response: any) {
  const token = response.token;
  localStorage.setItem("token", token);
}

export const signInUser = createAsyncThunk<UserInfo, SignInUserArgs>(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("/auth/signIn", {
        email: values.email,
        pass: values.password,
      });
      processData(response.data);
      return response.data.data[0];
      //   localStorage.setItem("token", response);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
