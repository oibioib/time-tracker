import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants';
import PageLayout from './layouts/PageLayout/PageLayout';
import { DashboardPage, ErrorPage, LoginPage, MainPage } from './pages';
import {
  ClientsView,
  ProjectView,
  ProjectsView,
  SettingsView,
  StatisticsView,
  TrackerView,
} from './pages/DashboardPage/DashboardViews';
import Theme from './theme/appTheme';

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
          {
            path: ROUTES.PROJECTS_VIEW,
            element: <ProjectsView />,
          },
          {
            path: `${ROUTES.PROJECTS_VIEW}/${ROUTES.PROJECTS_ID}`,
            element: <ProjectView />,
          },
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
  return (
    <ThemeProvider theme={Theme()}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
