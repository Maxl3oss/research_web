import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SignInUserArgs, UserInfo } from "./auth.interface";
import { FetchLogin } from "@services/auth.service";
import { GetProfileById } from "@services/user.service";

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
      return rejectWithValue("อีเมลหรือรหัสผ่านไม่ถูกต้อง !");
    }
  }
);

export const Logout = createAction("auth/logout");

export const Update = createAsyncThunk<UserInfo, { id: string }>(
  "auth/update",
  async (values, { rejectWithValue }) => {
    try {
      const response = await GetProfileById(values.id);
      return response.data;
    } catch (err) {
      return rejectWithValue("ไมพบผู้ใช้งาน !");
    }
  }
);