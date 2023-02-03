import { Grid } from '@mui/material';

import ContainerLayout from '../ContainerLayout/ContainerLayout';
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
    </Grid>
  );
};

export default PageLayout;
