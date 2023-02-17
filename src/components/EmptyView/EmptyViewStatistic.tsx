import { Box, Paper, Typography } from '@mui/material';

import { ReactComponent as StatisticsLogo } from '../../assets/profits-analytics-svgrepo-com.svg';

const EmptyViewStatistic = () => {
  return (
    <Box mx="auto">
      <Paper elevation={3}>
        <StatisticsLogo height={200} width="100%" />
        <Box width="50%" mx="auto" my={2}>
          <Box>
            <Typography variant="h3">
              <b>Select the correct parameters</b>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>Select time interval</Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmptyViewStatistic;
