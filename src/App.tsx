import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants';
import {
  DashboardPage,
  ErrorPage,
  FakeNavigationPage,
  LoginPage,
  MainPage,
} from './pages';
import {
  ClientsView,
  ProjectsView,
  SettingsView,
  StatisticsView,
  TrackerView,
} from './pages/DashboardPage/DashboardViews';

const router = createBrowserRouter([
  {
    path: '',
    element: <FakeNavigationPage />,
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
  return <RouterProvider router={router} />;
};

export default App;
