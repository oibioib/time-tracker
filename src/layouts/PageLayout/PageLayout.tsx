import { Grid } from '@mui/material';

import ContainerLayout from '../ContainerLayout/ContainerLayout';
import FooterLayout from '../FooterLayout';
import HeaderLayout from '../HeaderLayout/HeaderLayout';

const PageLayout = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      minHeight="100vh">
      <Grid
        item
        container
        sx={{ backgroundColor: 'primary.main', width: 'auto' }}
        p={2}>
        <HeaderLayout />
      </Grid>
      <Grid item pl={2} pr={2} minHeight="80vh">
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
        p={1}>
        <FooterLayout />
      </Grid>
    </Grid>
  );
};

export default PageLayout;
