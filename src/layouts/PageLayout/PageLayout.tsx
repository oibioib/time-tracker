import { Grid } from '@mui/material';

import ContainerLayout from '../ContainerLayout/ContainerLayout';
import FooterLayout from '../FooterLayout';
import HeaderLayout from '../HeaderLayout/HeaderLayout';

const PageLayout = () => {
  return (
    <Grid container direction="column">
      <Grid
        item
        container
        sx={{ backgroundColor: 'primary.main', width: 'auto' }}
        p={2}>
        <HeaderLayout />
      </Grid>
      <Grid item p={2}>
        <ContainerLayout />
      </Grid>
      <Grid
        item
        container
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          bottom: 0,
        }}
        p={1}
        mt={1}>
        <FooterLayout />
      </Grid>
    </Grid>
  );
};

export default PageLayout;
