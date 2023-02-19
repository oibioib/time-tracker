import { useEffect } from 'react';

import { IconButton } from '@mui/material';

import { LOCAL_THEME_MOD } from '../../constants';
import { THEME_MODE } from '../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeTheme } from '../../store/themeModeSlice';
import { Brightness4Icon, Brightness7Icon } from '../../theme/appIcons';

const ThemeSwitch = () => {
  const mode = useAppSelector((state) => state.themeMode.themeColor);
  const dispatch = useAppDispatch();

  const toggleColorMode = () => {
    const newMode =
      mode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    dispatch(changeTheme(newMode));
    localStorage.setItem(LOCAL_THEME_MOD, newMode);
  };
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeSwitch;
