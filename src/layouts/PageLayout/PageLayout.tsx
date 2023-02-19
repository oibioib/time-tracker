import { Grid } from '@mui/material';

import ContainerLayout from '../ContainerLayout/ContainerLayout';
import FooterLayout from '../FooterLayout';
import HeaderLayout from '../HeaderLayout/HeaderLayout';

const PageLayout = () => {
  return (
    <Grid container direction="column" minHeight="100vh">
      <Grid
        item
        container
        sx={{ backgroundColor: 'primary.dark', width: 'auto' }}
        p={2}>
        <HeaderLayout />
      </Grid>
      <Grid item sx={{ flex: '1 1 0' }}>
        <ContainerLayout />
      </Grid>
      <Grid
        item
        container
        sx={{
          backgroundColor: 'primary.dark',
        }}
        p={1}>
        <FooterLayout />
      </Grid>
    </Grid>
  );
};

export default PageLayout;
