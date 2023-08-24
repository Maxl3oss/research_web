import { createSlice } from '@reduxjs/toolkit';

export type ITheme = 'light' | 'dark';

export const getInitialTheme = (): ITheme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPreFs = window.localStorage.getItem('current-theme');
    if (typeof storedPreFs === 'string') {
      return storedPreFs as ITheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'dark';
};

export interface ThemeState {
  theme: ITheme;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() } as ThemeState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('current-theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;