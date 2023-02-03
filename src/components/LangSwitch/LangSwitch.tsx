import { useTranslation } from 'react-i18next';

import { Button, Grid } from '@mui/material';

const LangSwitch = () => {
  const { i18n } = useTranslation();

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          onClick={() => changeLanguage('en')}>
          EN
        </Button>
      </Grid>
      <Grid item>
        <Button
          size="large"
          variant="contained"
          onClick={() => changeLanguage('ru')}>
          RU
        </Button>
      </Grid>
    </Grid>
  );
};

export default LangSwitch;
