import { PaletteMode, ThemeOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { useAppSelector } from '../hooks/hooks';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#765098',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#3e2852',
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#765098',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#3e2852',
    },
  },
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    letterSpacing: 'normal',
  },
  h1: {
    fontWeight: 600,
  },
  h2: {
    fontWeight: 600,
  },
  h3: {
    fontWeight: 600,
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 600,
  },
};

const getThemeTokens = (mode: PaletteMode) => ({
  ...(mode === 'light' ? lightTheme : darkTheme),
  typography,
  shape: {
    borderRadius: 5,
  },
});

const Theme = () => {
  const storeColorTheme = useAppSelector((state) => state.themeMode.themeColor);
  return createTheme(getThemeTokens(storeColorTheme));
};

export default Theme;
