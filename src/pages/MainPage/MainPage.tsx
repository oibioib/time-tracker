import { useTranslation } from 'react-i18next';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import AboutUs from '../../components/AboutUs';
import { MAIN_PAGE_CARDS } from '../../constants';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Grid container alignItems="center" justifyContent="center" mb={12}>
      <Grid item container pb={3} pt={3} justifyContent="center">
        <Grid maxWidth={800}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{ color: 'primary.info' }}>
            {t('mainPage.title')}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            sx={{ color: 'primary.main' }}
            align="center">
            {t('mainPage.subtitle')}
          </Typography>
        </Grid>
        <Card sx={{ maxWidth: 550, mr: 2, mb: 2, ml: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="350"
              image="./images/hourglass.jpg"
              alt="hourglass"
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {MAIN_PAGE_CARDS.map((card) => (
          <Card sx={{ maxWidth: 335, m: 2 }} key={card.title}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={card.image}
                alt="card of app"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {t(`titleCard.${card.title}`)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(`description.${card.title}`)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
      <AboutUs />
    </Grid>
  );
};

export default MainPage;
