import { useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants';
import PageLayout from './layouts/PageLayout/PageLayout';
import { DashboardPage, ErrorPage, LoginPage, MainPage } from './pages';
import {
  ClientsView,
  ProjectsView,
  SettingsView,
  StatisticsView,
  TrackerView,
} from './pages/DashboardPage/DashboardViews';
import { Brightness4Icon, Brightness7Icon } from './theme/appIcons';
import getThemeTokens from './theme/appTheme';

const router = createBrowserRouter([
  {
    path: '',
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <ProtectedRoute outlet={<DashboardPage />} />,
        children: [
          {
            path: '',
            element: <TrackerView />,
          },
          { path: ROUTES.PROJECTS_VIEW, element: <ProjectsView /> },
          { path: ROUTES.CLIENTS_VIEW, element: <ClientsView /> },
          {
            path: ROUTES.STATISTICS_VIEW,
            element: <StatisticsView />,
          },
          {
            path: ROUTES.SETTINGS_VIEW,
            element: <SettingsView />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  // TODO need to move to global state
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getThemeTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit">
        {theme.palette.mode === 'light' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
