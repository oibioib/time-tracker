import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { List, ListItemButton, ListItemIcon } from '@mui/material';

import { DASHBOARD_NAVIGATION } from '../../constants';
import Logout from '../Logout/Logout';
import UserAvatar from '../UserAvatar';

const DashboardSidebar = () => {
  const { t } = useTranslation();
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        justifyContent: 'space-between',
      }}>
      <UserAvatar />
      <Logout />
      {DASHBOARD_NAVIGATION.map((item) => (
        <ListItemButton key={item.label}>
          <NavLink to={`${item.route}`}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            {t(`dashboard.${item.label}`)}
          </NavLink>
        </ListItemButton>
      ))}
    </List>
  );
};

export default DashboardSidebar;
