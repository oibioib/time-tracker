import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { getProjectTimers } from '../../../../api/serverApi';
import EmptyViewProject from '../../../../components/EmptyView/EmtyViewProject';
import CalendarStatistics from '../../../../components/SelectStatistics';
import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
} from '../../../../constants/appConstants';
import { timeStringHelper } from '../../../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { addTimePeriod } from '../../../../store/statisticSlice';
import { mainTitleTypography } from '../../../../theme/elementsStyles';
import { TimerData } from '../../../../types/trackerInterfaces';

const ProjectView = () => {
  const { projectId } = useParams();
  const { timePeriod } = useAppSelector((state) => state.statistics);
  const [timersArr, setTimersArr] = useState<TimerData[]>([]);
  const [isTimersData, setIsTimersData] = useState(false);
  const [startDate, endDate] = timePeriod;
  const dispatch = useAppDispatch();
  const [pageTitle, setPageTitle] = useState('');
  const timeStringTotal = timeStringHelper(
    timersArr.reduce((acc, cur) => {
      const sum = acc + +cur.totalTime;
      return sum;
    }, 0)
  );

  useEffect(() => {
    (async () => {
      if (projectId) {
        const data = await getProjectTimers(projectId, startDate, endDate);
        setPageTitle(data.title);
        setTimersArr(data.timers);
        setIsTimersData(true);
      }
    })();
  }, [projectId, startDate, endDate]);

  useEffect(() => {
    return () => {
      dispatch(
        addTimePeriod([
          DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
          DEFAULT_END_TODAY_TIMESTAMP,
        ])
      );
    };
  }, [dispatch]);

  if (!isTimersData) {
    return <Box> </Box>;
  }

  return (
    <Grid container direction="column">
      <Typography component="h1" sx={mainTitleTypography}>
        {pageTitle}
      </Typography>
      <Typography component="h2" my={2}>
        Total Time spend in period: {timeStringTotal}
      </Typography>
      <Grid container gap={2}>
        <CalendarStatistics />
        {timersArr.length ? (
          <Grid container mt={1}>
            {timersArr.map(({ id, startTime, title, totalTime }: TimerData) => {
              const startingDate = new Date(+startTime);
              return (
                <Grid key={id} item xs={12} mb={1}>
                  <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 } }}>
                    <Grid
                      item
                      container
                      direction="column"
                      xs={12}
                      md={10}
                      gap={1}>
                      <Grid item mb={1}>
                        <Typography component="h3" variant="h6">
                          {title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          {startingDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          | Time spend: {timeStringHelper(+totalTime)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container mt={1}>
            <EmptyViewProject />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectView;
