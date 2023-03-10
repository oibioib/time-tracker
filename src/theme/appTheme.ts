import { PaletteMode, ThemeOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { useAppSelector } from '../hooks/hooks';
import palette from './palette.module.scss';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    sidebar: { main: string };
    third: { main: string };
    accent: { main: string; light: string };
    folder: { main: string; hover: string };
    block: { main: string };
    play: { main: string };
  }

  interface PaletteOptions {
    sidebar?: { main: string };
    third?: { main: string };
    accent?: { main: string; light: string };
    folder?: { main: string; hover: string };
    block?: { main: string };
    play?: { main: string };
  }
}

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: palette.primaryMain,
    },
    secondary: {
      main: '#ffc145',
    },
    text: {
      primary: palette.textLight,
    },
    info: {
      main: '#ffffff',
    },
    background: {
      default: palette.bgLight,
      paper: palette.bgPaperLight,
    },
    sidebar: {
      main: '#7b7c9c',
    },
    third: {
      main: '#5b5f97',
    },
    accent: {
      main: palette.accent,
      light: palette.accentLight,
    },
    folder: {
      main: palette.folderIcoColor,
      hover: palette.folderIcoColorHover,
    },
    block: {
      main: palette.blockBgLight,
    },
    play: {
      main: palette.colorBgPlayLight,
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: palette.primaryMain,
    },
    secondary: {
      main: '#fffb6c',
    },
    text: {
      primary: palette.textDark,
    },
    background: {
      default: palette.bgDark,
      paper: palette.bgPaperDark,
    },
    info: {
      main: '#ececec',
    },
    sidebar: {
      main: '#27272b',
    },
    third: {
      main: '#ececec',
    },
    accent: {
      main: palette.accent,
      light: palette.accentLight,
    },
    folder: {
      main: palette.folderIcoColor,
      hover: palette.folderIcoColorHover,
    },
    block: {
      main: palette.blockBgDark,
    },
    play: {
      main: palette.colorBgPlayDark,
    },
  },
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: '"Noto Sans", "Roboto", "Inter", sans-serif',
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
    borderRadius: +palette.mainRadius,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 7,
      },
    },
  },
});

const Theme = () => {
  const storeColorTheme = useAppSelector((state) => state.themeMode.themeColor);
  return createTheme(getThemeTokens(storeColorTheme));
};

export default Theme;
