import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  search: string;
}

const initialState: CounterState = {
  search: "",
};

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = SearchSlice.actions;

export default SearchSlice.reducer;
