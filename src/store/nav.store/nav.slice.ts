import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  navLoading: boolean;
}

const initialState: LoadingState = {
  navLoading: true,
};

export const NavSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setNavLoading: (state, action: PayloadAction<boolean>) => {
      state.navLoading = action.payload;
    },
  },
});

export const { setNavLoading } = NavSlice.actions;

export default NavSlice.reducer;
