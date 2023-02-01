import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  CLIENTS_VIEW,
  DASHBOARD,
  LOGIN,
  PROJECTS_VIEW,
  SETTINGS_VIEW,
  STATISTICS_VIEW,
} from './Constants/Constants';
import {
  ClientsPage,
  DashboardPage,
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
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: LOGIN,
        element: <LoginPage />,
      },
      {
        path: DASHBOARD,
        element: <DashboardPage />,
        children: [
          {
            path: '',
            element: <TrackerPage />,
          },
          { path: PROJECTS_VIEW, element: <ProjectsPage /> },
          { path: CLIENTS_VIEW, element: <ClientsPage /> },
          {
            path: STATISTICS_VIEW,
            element: <StatisticsPage />,
          },
          {
            path: SETTINGS_VIEW,
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
