import React, { createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITheme, getInitialTheme, setTheme } from './theme.slice';
import { IRootState } from '..';

export const ThemeContext = createContext<ITheme>("dark");

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useSelector((state: IRootState) => state.RDtheme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheme(getInitialTheme()));
  }, [dispatch]);

  useEffect(() => {
    const mainElements = document.getElementById('body-main');
    if (mainElements) {
      mainElements.style.backgroundColor = theme === "dark" ? "#18181b" : "#FAFAFA";
    }
    document.documentElement.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={"dark"}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
