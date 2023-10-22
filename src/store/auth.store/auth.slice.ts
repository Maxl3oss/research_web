import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Login, Logout } from "./auth.actions";
import { AuthState } from './auth.interface';

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  isLoading: false,
  role: null,
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

    builder.addCase(Logout, () => {
      localStorage.clear();
      return initialState;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
