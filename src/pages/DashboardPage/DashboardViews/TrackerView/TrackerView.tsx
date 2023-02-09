import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Grid, Paper, TextField } from '@mui/material';

import AddedTask from '../../../../components/AddedTask/AddedTask';
import EmptyView from '../../../../components/EmptyView/EmptyView';
import Timer from '../../../../components/Timer/Timer';
import { LOCAL_TIMER } from '../../../../constants';
import { BASE_URL, FLY_ROUTES } from '../../../../constants/apiFly';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setStartTime } from '../../../../store/timeTrackerSlice';

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
  id: string;
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
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.timeTracker.totalTime);

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
        // endTime: timesStamps.endTime,
        userId: flyUserId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Could not POST data to DB');
    }
    setDisableAdd(true);
    dispatch(setStartTime({ startTime: 0 }));
    localStorage.removeItem(LOCAL_TIMER);
    setTaskNamePrinted('');
    setRefreshPage(!refreshPage);
  };

  useEffect(() => {
    if (flyUserId) {
      (async () => {
        const response = await fetch(
          `${BASE_URL}/${FLY_ROUTES.TIMERS}/${flyUserId}`
        );
        if (!response.ok) {
          throw new Error('Could not get new User id');
        }
        const data: FetchingTrackerData = await response.json();
        console.log(data);
        const dataArr: TaskArr[] = Object.entries(data).map(
          (el: [string, TaskData]) => {
            return {
              id: el[1].id,
              taskName: el[1].title,
              taskStart: new Date(+el[1].startTime).toLocaleDateString(
                'en-US',
                {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }
              ),
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
      {tasksArr.length ? (
        tasksArr.map(({ id, taskName, taskStart, taskTimeSec }) => {
          return (
            <Grid key={id} item xs={12} my={3}>
              <Paper>
                <AddedTask
                  taskName={taskName}
                  taskStart={taskStart}
                  taskTimeSec={taskTimeSec}
                  id={id}
                  setRefreshPage={setRefreshPage}
                  refreshPage={refreshPage}
                />
              </Paper>
            </Grid>
          );
        })
      ) : (
        <EmptyView />
      )}
    </Grid>
  );
};

export default TrackerView;
