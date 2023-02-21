import { Box, Paper, Typography } from '@mui/material';

import { ReactComponent as TaskLogo } from '../../assets/task-list-menu.svg';

const EmptyView = () => {
  return (
    <Box mx="auto">
      <Paper elevation={3}>
        <TaskLogo height={200} width="100%" />
        <Box width="50%" mx="auto" my={2}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3">
              <b>Create your first task tracker or change the period</b>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            Simple enter the name of the task you are working on and press start
            timer button. Timer will be created when you stop it. Or change the
            period
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmptyView;
