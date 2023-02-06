import { useState } from 'react';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

interface TaskArr {
  taskName: string;
  sec: number;
  min: number;
  hours: number;
  date: number;
  month: number;
  year: number;
  id: number;
}

const TrackerView = () => {
  const [taskNamePrinted, setTaskNamePrinted] = useState('');
  const [tasksArr, setTasksArr] = useState<TaskArr[]>([]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskNamePrinted(event.target.value);
  };
  const addTaskHandler = () => {
    const time = new Date();
    const newTask = {
      taskName: taskNamePrinted,
      sec: time.getSeconds(),
      min: time.getMinutes(),
      hours: time.getHours(),
      date: time.getDate(),
      month: time.getMonth(),
      year: time.getFullYear(),
      id: Date.now(),
    };

    setTasksArr([...tasksArr, newTask]);
  };
  return (
    <Grid item container>
      <Grid item xs={12}>
        <Paper>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Box>
              <TextField
                placeholder="What are you working on"
                value={taskNamePrinted}
                onChange={onChangeHandler}
              />
            </Box>
            <Button onClick={addTaskHandler} variant="contained">
              Add
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
          <Box>Period: this week/this month?/choose period</Box>
          <Box sx={{ display: 'flex' }}>
            <Box mr={1}>Period: total</Box>
            <Box>Today: total</Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box my={3} sx={{ height: 5, backgroundColor: 'coral' }}>
          {' '}
        </Box>
      </Grid>
      {tasksArr.length
        ? tasksArr.map(
            ({ id, taskName, year, month, date, hours, min, sec }) => {
              return (
                <Grid key={id} item xs={12} my={3}>
                  <Paper>
                    <Box
                      sx={{ justifyContent: 'space-between', display: 'flex' }}>
                      <Box>
                        <Box>
                          Task date:
                          {year}.{month}.{date}
                        </Box>
                        <Box>{taskName}</Box>
                      </Box>
                      <Box>
                        Time spend {hours}: {min}: {sec}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            }
          )
        : ''}
    </Grid>
  );
};

export default TrackerView;
