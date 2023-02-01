import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';
import { PagesRoutingNames } from './Constants/Constants';
import {
  ClientsPage,
  DashboardPage,
  ErrorPage,
  FakeNavigation,
  LoginPage,
  MainPage,
  ProjectsPage,
  SettingsPage,
  StatisticsPage,
  TrackerPage,
} from './Pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <FakeNavigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: PagesRoutingNames.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PagesRoutingNames.DASHBOARD,
        element: <ProtectedRoute outlet={<DashboardPage />} />,
        children: [
          {
            path: '',
            element: <TrackerPage />,
          },
          { path: PagesRoutingNames.PROJECTS_VIEW, element: <ProjectsPage /> },
          { path: PagesRoutingNames.CLIENTS_VIEW, element: <ClientsPage /> },
          {
            path: PagesRoutingNames.STATISTICS_VIEW,
            element: <StatisticsPage />,
          },
          {
            path: PagesRoutingNames.SETTINGS_VIEW,
            element: <SettingsPage />,
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
