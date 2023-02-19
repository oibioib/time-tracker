import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { LogoutIcon } from '../../theme/appIcons';
import {
  HeaderButton,
  headerButtonTypography,
} from '../../theme/styledComponents/HeaderButton';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(setGitHubUserData({ login: 'login', id: 0, avatar_url: 'url' }));
    navigate('/');
  };

  return (
    <HeaderButton variant="text" onClick={logoutHandler}>
      <LogoutIcon />
      <Typography sx={headerButtonTypography}>{t('buttons.logout')}</Typography>
    </HeaderButton>
  );
};

export default Logout;
