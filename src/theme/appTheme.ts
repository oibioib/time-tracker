import { PaletteMode, ThemeOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { useAppSelector } from '../hooks/hooks';

export const MAX_CONTENT_WIDTH = 1400;

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5b5f97',
    },
    secondary: {
      main: '#ffc145',
    },
    info: {
      main: '#ffffff',
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5b5f97',
    },
    secondary: {
      main: '#fffb6c',
    },
    text: {
      primary: '#E6E6E6',
    },
    background: {
      default: '#303035',
      paper: '#424248',
    },
    info: {
      main: '#ffffff',
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
  body2: {
    fontSize: 12,
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
