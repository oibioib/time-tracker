import { useTranslation } from 'react-i18next';
import { Link as LinkRouter } from 'react-router-dom';

import { Button, Grid } from '@mui/material';

import LangSwitch from '../../components/LangSwitch';
import { ROUTES } from '../../constants';

const HeaderLayout = () => {
  const { t } = useTranslation();
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between">
      <Grid item>
        <Button size="large" variant="contained" component={LinkRouter} to="/">
          {t('buttons.mainPage')}
        </Button>
      </Grid>
      <Grid item container spacing={1} sx={{ width: 'auto' }}>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            component={LinkRouter}
            to={ROUTES.LOGIN}>
            {t('buttons.loginPage')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            component={LinkRouter}
            to={ROUTES.DASHBOARD}>
            {t('buttons.dashboardPage')}
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <LangSwitch />
      </Grid>
    </Grid>
  );
};

export default HeaderLayout;
