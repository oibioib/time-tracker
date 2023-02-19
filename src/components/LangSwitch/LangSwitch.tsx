import { useTranslation } from 'react-i18next';

import { Button, Grid, Typography } from '@mui/material';

import { LOCAL_LANGUAGE } from '../../constants/storageConstants';

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const language = localStorage.getItem(LOCAL_LANGUAGE) || 'en';

  const changeLanguage = () => {
    if (language === 'en') {
      i18n.changeLanguage('ru');
      localStorage.setItem(LOCAL_LANGUAGE, 'ru');
    } else {
      i18n.changeLanguage('en');
      localStorage.setItem(LOCAL_LANGUAGE, 'en');
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          size="small"
          onClick={changeLanguage}
          color="info"
          sx={{
            ':hover': {
              bgcolor: 'info.main',
              color: 'white',
            },
          }}>
          <Typography color="white" variant="body1" component="span">
            {language === 'en' ? 'EN' : 'RU'}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LangSwitch;
