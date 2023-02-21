import { Box, Paper, Typography } from '@mui/material';

const EmptyViewProject = () => {
  return (
    <Box mx="auto">
      <Paper elevation={3}>
        <Box width="50%" mx="auto" my={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              <b>Create your first task in tracker or change the period</b>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            Open time tracker and add project to some of your trackers or change
            the period
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmptyViewProject;
