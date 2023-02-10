import { useEffect, useState } from 'react';

import { Box, Grid, Paper, TextField } from '@mui/material';

import AddedTask from '../../../../components/AddedTask/AddedTask';
import EmptyView from '../../../../components/EmptyView/EmptyView';
import Timer from '../../../../components/Timer/Timer';
import { BASE_URL, FLY_ROUTES } from '../../../../constants/apiFly';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setIsTimerOn, setTimerData } from '../../../../store/timeTrackerSlice';

interface TaskArr {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
}

interface TaskData {
  startTime: number;
  totalTime: number;
  title: string;
  id: string;
}

const TrackerView = () => {
  const timerData = useAppSelector((state) => state.timeTracker);
  const [tasksArr, setTasksArr] = useState<TaskArr[]>([]);
  const [refreshPage, setRefreshPage] = useState(true);
  const flyUserId = useAppSelector((state) => state.flyUserData.id);
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTimerData({
        ...timerData,
        timerTitle: event.target.value,
      })
    );
  };

  useEffect(() => {
    if (flyUserId) {
      (async () => {
        const response = await fetch(
          `${BASE_URL}/${FLY_ROUTES.USER_TIMERS}/${flyUserId}`
        );
        if (!response.ok) {
          throw new Error('Could not get new User id');
        }
        const data: TaskData[] = await response.json();
        console.log(data);
        const dataArr: TaskArr[] = data
          .sort((a, b) => b.startTime - a.startTime)
          .map((el: TaskData) => {
            return {
              id: el.id,
              taskName: el.title,
              taskStart: new Date(+el.startTime).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
              taskTimeSec: +el.totalTime,
            };
          });
        setTasksArr(dataArr);
      })();
    }
  }, [refreshPage, flyUserId]);

  useEffect(() => {
    if (flyUserId) {
      (async () => {
        const response = await fetch(
          `${BASE_URL}/${FLY_ROUTES.USER_TIMERS}/${flyUserId}${FLY_ROUTES.IS_ACTIVE_TIMERS}`
        );
        if (!response.ok) {
          throw new Error('Could not get information about User active Timers');
        }
        const data = await response.json();
        if (data[0]?.isActive) {
          dispatch(
            setTimerData({
              timerId: data[0].id,
              timerTitle: data[0].title,
              totalTime: +data[0].totalTime || 0,
              startTime: data[0].startTime,
            })
          );
          dispatch(setIsTimerOn(true));
        }
      })();
    }
  }, [flyUserId, dispatch]);

  return (
    <Grid item container pt={2}>
      <Grid item xs={12}>
        <Paper>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Box>
              <TextField
                placeholder="What are you working on"
                value={timerData.timerTitle}
                onChange={onChangeHandler}
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Timer
                setRefreshPage={setRefreshPage}
                refreshPage={refreshPage}
                flyUserId={flyUserId}
              />
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
