import { useEffect, useState } from 'react';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

import AddedTask from '../../../../components/AddedTask/AddedTask';
import Timer from '../../../../components/Timer/Timer';
import { useAppSelector } from '../../../../hooks/hooks';

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
  const timesStamps = useAppSelector((state) => state.timeTracker);
  console.log(timesStamps);

  const addTaskHandler = async () => {
    const response = await fetch(
      'https://react-http-d76ff-default-rtdb.europe-west1.firebasedatabase.app/addedTask.json',
      {
        method: 'POST',
        body: JSON.stringify({
          name: taskNamePrinted,
          timeStart: timesStamps.startTime,
          endTime: timesStamps.endTime,
        }),
      }
    );
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://react-http-d76ff-default-rtdb.europe-west1.firebasedatabase.app/addedTask.json'
      );
      const data = await response.json();
      console.log(data);
    })();
  }, []);

  return (
    <Grid container>
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
            <Box sx={{ display: 'flex' }}>
              <Timer />
              <Button onClick={addTaskHandler} variant="contained">
                Add
              </Button>
            </Box>
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
                    <AddedTask
                      taskName={taskName}
                      year={year}
                      month={month}
                      date={date}
                      hours={hours}
                      min={min}
                      sec={sec}
                    />
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
