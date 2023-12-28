import { IResearch } from "@interfaces/research.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateValueType } from "react-tailwindcss-datepicker";
export interface CounterState {
  search: string;
  tagsList: string[];
  data: IResearch[];
  isLoad: boolean;
  dateValue: DateValueType;
}

const initialState: CounterState = {
  search: "",
  tagsList: [],
  data: [],
  isLoad: false,
  dateValue: null,
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
    setDateValue: (state, action: PayloadAction<DateValueType>) => {
      state.dateValue = action.payload;
    },
  },
});

export const { setSearch, setTagsList, setResultSearch, setIsLoad, setDateValue } = SearchSlice.actions;

export default SearchSlice.reducer;
