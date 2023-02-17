import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Grid, Typography } from '@mui/material';

const LangSwitch = () => {
  const [isEng, setIsEng] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    if (isEng) {
      i18n.changeLanguage('en');
      setIsEng(false);
    } else {
      i18n.changeLanguage('ru');
      setIsEng(true);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          size="large"
          onClick={changeLanguage}
          sx={{
            minWidth: 'auto',
            ':hover': {
              bgcolor: 'primary.main',
              color: 'text.primary',
            },
          }}>
          <Typography color="white" variant="body1" component="span">
            {isEng ? 'RU' : 'EN'}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LangSwitch;
