import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Login, Logout, Update } from "./auth.actions";
import { AuthState } from './auth.interface';

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  isLoading: false,
  role: JSON.parse(localStorage.getItem("role") || "{}"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    // login
    builder.addCase(Login.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("role", JSON.stringify(action.payload.role_id));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
          ...state,
          user: action.payload,
          role: action.payload.role_id,
          isLoading: false,
        };
      } else return state;
    });
    builder.addCase(Login.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        return { ...state, isLoading: false };
      }
    });
    // log out
    builder.addCase(Logout, () => {
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        token: null,
        isLoading: false,
        role: null,
        user: null,
      };
    });

    // update 
    builder.addCase(Update.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("role", JSON.stringify(action.payload.role_id));
        return {
          ...state,
          user: action.payload,
          role: action.payload.role_id,
          isLoading: false,
        };
      } else return state;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
