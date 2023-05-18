import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

export const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs as Theme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

export interface ThemeState {
  theme: Theme;
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