import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  search: string;
  tagsList: string[];
}

const initialState: CounterState = {
  search: "",
  tagsList: [],
};

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setTagsList: (state, action: PayloadAction<string[]>) => {
      state.tagsList = action.payload;
    },
  },
});

export const { setSearch, setTagsList } = SearchSlice.actions;

export default SearchSlice.reducer;
