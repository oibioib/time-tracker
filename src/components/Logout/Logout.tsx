import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { useAppDispatch } from '../../hooks/hooks';
import { setGitHubUserData } from '../../store/gitHubFetchSlice';
import { LogoutIcon } from '../../theme/appIcons';

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
    <Box mt={5} ml={2}>
      <Button
        size="large"
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={logoutHandler}>
        <Typography color="white" sx={{ display: { xs: 'none', sm: 'block' } }}>
          {t('buttons.logout')}
        </Typography>
      </Button>
    </Box>
  );
};

export default Logout;
