import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import { DASHBOARD_NAVIGATION } from '../../constants';
import palette from '../../theme/palette.module.scss';
import {
  SidebarButton,
  sidebarButtonTypography,
} from '../../theme/styledComponents/SidebarButton';
import UserAvatar from '../UserAvatar';

const navStyle = {
  display: 'block',
  width: '100%',
  textDecoration: 'none',
  borderRadius: `${palette.mainRadius}px`,
};

const activeNavStyle = {
  backgroundColor: palette.primaryMainDarken,
};

const DashboardSidebar = () => {
  const { t } = useTranslation();
  return (
    <Grid container direction="column">
      <Grid item container justifyContent="center" px={{ xs: 1, md: 2 }} py={2}>
        <UserAvatar />
      </Grid>
      <Grid item container sx={{ gap: 1, p: { xs: 1, sm: 2 } }}>
        {DASHBOARD_NAVIGATION.map((item) => (
          <NavLink
            key={item.label}
            to={`${item.route}`}
            style={({ isActive }) =>
              isActive ? { ...navStyle, ...activeNavStyle } : navStyle
            }
            end>
            <SidebarButton>
              {item.icon}
              <Typography sx={sidebarButtonTypography}>
                {t(`dashboard.${item.label}`)}
              </Typography>
            </SidebarButton>
          </NavLink>
        ))}
      </Grid>
    </Grid>
  );
};

export default DashboardSidebar;
