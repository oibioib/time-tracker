import { useEffect, useState } from 'react';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

import AddedTask from '../../../../components/AddedTask/AddedTask';
import Timer from '../../../../components/Timer/Timer';
import { BASE_URL, FLY_ROUTES } from '../../../../constants/apiFly';
import { useAppSelector } from '../../../../hooks/hooks';

interface TaskArr {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
}

interface TaskData {
  startTime: number;
  endTime: number;
  title: string;
}

interface FetchingTrackerData {
  id: TaskData;
}

const TrackerView = () => {
  const [taskNamePrinted, setTaskNamePrinted] = useState('');
  const [tasksArr, setTasksArr] = useState<TaskArr[]>([]);
  const [disabledAdd, setDisableAdd] = useState(true);
  const [refreshPage, setRefreshPage] = useState(true);
  const flyUserId = useAppSelector((state) => state.flyUserData.id);

  console.log(flyUserId);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskNamePrinted(event.target.value);
  };
  const timesStamps = useAppSelector((state) => state.timeTracker);

  const addTaskHandler = async () => {
    const response = await fetch(`${BASE_URL}/${FLY_ROUTES.TIMERS}`, {
      method: 'POST',
      body: JSON.stringify({
        title: taskNamePrinted,
        startTime: timesStamps.startTime,
        endTime: timesStamps.endTime,
        userId: flyUserId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Could not POST data to DB');
    }
    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    if (flyUserId) {
      (async () => {
        const response = await fetch(
          `${BASE_URL}/${FLY_ROUTES.TIMERS}/${flyUserId}`
        );
        const data: FetchingTrackerData = await response.json();
        const dataArr: TaskArr[] = Object.entries(data).map(
          (el: [string, TaskData]) => {
            return {
              id: el[0],
              taskName: el[1].title,
              taskStart: new Date(el[1].startTime).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
              taskTimeSec: el[1].endTime - el[1].startTime,
            };
          }
        );
        setTasksArr(dataArr);
      })();
    }
  }, [refreshPage, flyUserId]);

  return (
    <Grid item container pt={2}>
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
              <Timer setDisableAdd={setDisableAdd} />
              <Button
                onClick={addTaskHandler}
                variant="contained"
                disabled={disabledAdd}>
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
        ? tasksArr.map(({ id, taskName, taskStart, taskTimeSec }) => {
            return (
              <Grid key={id} item xs={12} my={3}>
                <Paper>
                  <AddedTask
                    taskName={taskName}
                    taskStart={taskStart}
                    taskTimeSec={taskTimeSec}
                  />
                </Paper>
              </Grid>
            );
          })
        : ''}
    </Grid>
  );
};

export default TrackerView;
