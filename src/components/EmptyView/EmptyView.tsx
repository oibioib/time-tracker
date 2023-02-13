import { Box, Paper, Typography } from '@mui/material';

import { ReactComponent as TaskLogo } from '../../assets/task-list-menu.svg';

const EmptyView = () => {
  return (
    <Box mx="auto">
      <Paper elevation={3}>
        <TaskLogo height={200} width="100%" />
        <Box width="50%" mx="auto" my={2}>
          <Box>
            <Typography variant="h3">
              <b>Create your first task tracker</b>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            Simple enter the name of the task you are working on and press start
            timer button
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmptyView;
