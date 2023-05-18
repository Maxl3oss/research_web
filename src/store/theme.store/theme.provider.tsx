import React, { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeState, getInitialTheme, setTheme } from './theme.slice';

export const ThemeContext = createContext<any>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useSelector((state: { theme: ThemeState }) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheme(getInitialTheme()));
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
