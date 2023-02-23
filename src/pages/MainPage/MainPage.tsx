import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import AboutUs from '../../components/AboutUs';
import MainClocks from '../../components/MainClocks/MainClocks';
import { MAIN_PAGE_CARDS } from '../../constants';
import { MAX_CONTENT_WIDTH } from '../../theme/elementsStyles';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexDirection="column">
      <Grid item container>
        <Grid
          item
          container
          p={2}
          pt={{ xs: 3, md: 10 }}
          pb={{ xs: 5, md: 10 }}
          justifyContent="center"
          sx={{ backgroundColor: 'primary.dark', overflow: 'hidden' }}>
          <Grid
            item
            container
            sx={{ maxWidth: MAX_CONTENT_WIDTH }}
            justifyContent="space-between">
            <Grid
              item
              container
              xs={12}
              lg={9}
              sx={{ gap: 5 }}
              alignItems="center"
              justifyContent="center">
              <Typography
                component="h1"
                align="center"
                sx={{
                  color: 'info.main',
                  typography: { xs: 'h4', lg: 'h3' },
                }}>
                {t('mainPage.title')}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: 'primary.light',
                  typography: { xs: 'h6', lg: 'h5' },
                }}
                align="center">
                {t('mainPage.subtitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={3} pt={{ xs: 5, md: 10, lg: 0 }}>
              <MainClocks />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          p={2}
          sx={{ backgroundColor: 'primary.light' }}>
          {MAIN_PAGE_CARDS.map((card) => (
            <Card sx={{ maxWidth: 335, m: 2 }} key={card.title}>
              <CardMedia
                component="img"
                height="240"
                image={card.image}
                alt="card of app"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h3">
                  {t(`titleCard.${card.title}`)}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {t(`description.${card.title}`)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        p={2}
        sx={{ width: '100%', flexGrow: 1 }}>
        <AboutUs />
      </Grid>
    </Grid>
  );
};

export default MainPage;
