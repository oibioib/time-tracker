import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { List, ListItemButton, ListItemIcon } from '@mui/material';

import { DASHBOARD_NAVIGATION } from '../../constants';
import UserAvatar from '../UserAvatar';

const DashboardSidebar = () => {
  const { t } = useTranslation();
  return (
    <List>
      {DASHBOARD_NAVIGATION.map((item) => (
        <ListItemButton key={item.label}>
          <NavLink to={`${item.route}`}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            {t(`dashboard.${item.label}`)}
          </NavLink>
        </ListItemButton>
      ))}
      <UserAvatar />
    </List>
  );
};

export default DashboardSidebar;
