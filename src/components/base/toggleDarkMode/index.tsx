import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../store/theme.store/theme.slice';
import Lucide from '../lucide/index';

const ToggleDarkMode: React.FC = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <button onClick={handleToggle}>
      {theme === 'light' ? <Lucide name="Moon" /> : <Lucide name="Sun" />}
    </button>
  );
};

export default ToggleDarkMode;