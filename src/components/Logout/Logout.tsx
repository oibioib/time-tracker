import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { LOCAL_STORAGE_KEY } from '../../constants';
import { useAppDispatch } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { LogoutIcon } from '../../theme/appIcons';
import {
  HeaderButton,
  headerButtonTypography,
} from '../../theme/styledComponents/HeaderButton';

interface LogoutProps {
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
}

const Logout = ({ setRefreshPage, refreshPage }: LogoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const logoutHandler = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch(setGitHubUserData({ login: 'login', id: 0, avatar_url: 'url' }));
    navigate('/');
    setRefreshPage(!refreshPage);
  };

  return (
    <HeaderButton variant="text" onClick={logoutHandler}>
      <LogoutIcon />
      <Typography sx={headerButtonTypography}>{t('buttons.logout')}</Typography>
    </HeaderButton>
  );
};

export default Logout;
