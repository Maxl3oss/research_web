import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signInUser } from "./auth.actions";
import { AuthState } from "./auth.interface";


const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  isLoading: false,
  error: null,
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
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          user: action.payload,
          isLoading: false,
        };
      } else return state;
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        return { ...state, isLoading: false, error: action.payload };
      }
    });
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
