import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SignInUserArgs, UserInfo } from "./auth.interface";
import { FetchLogin } from "@services/auth.service";

export const Login = createAsyncThunk<UserInfo, SignInUserArgs>(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await FetchLogin({
        email: values.email,
        password: values.password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue("Fail Login!");
    }
  }
);

export const Logout = createAction("auth/logout");