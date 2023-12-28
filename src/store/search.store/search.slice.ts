import { IResearch } from "@interfaces/research.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CounterState {
  search: string;
  tagsList: string[];
  data: IResearch[];
  isLoad: boolean;
}

const initialState: CounterState = {
  search: "",
  tagsList: [],
  data: [],
  isLoad: false,
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
    setResultSearch: (state, action: PayloadAction<IResearch[]>) => {
      state.data = action.payload;
    },
    setIsLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
  },
});

export const { setSearch, setTagsList, setResultSearch, setIsLoad } = SearchSlice.actions;

export default SearchSlice.reducer;
