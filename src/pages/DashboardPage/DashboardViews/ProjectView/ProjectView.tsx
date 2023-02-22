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
import { useAppDispatch } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { mainTitleTypography } from '../../../../theme/elementsStyles';
import { TimerData } from '../../../../types/trackerInterfaces';

const ProjectView = () => {
  const { projectId } = useParams();
  const [timePeriod, setTimePeriod] = useState([
    DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
    DEFAULT_END_TODAY_TIMESTAMP,
  ]);
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
        try {
          const data = await getProjectTimers(projectId, startDate, endDate);
          setPageTitle(data.title);
          setTimersArr(data.timers);
          setIsTimersData(true);
        } catch (error) {
          dispatch(setErrorMessage("Failed to get Project's timers"));
        }
      }
    })();
  }, [projectId, startDate, endDate, dispatch]);

  if (!isTimersData) {
    return <Box> </Box>;
  }

  return (
    <Grid container direction="column">
      <Typography component="h1" sx={mainTitleTypography}>
        {pageTitle}
      </Typography>
      <Grid
        item
        container
        alignItems="center"
        mt={1}
        mb={2}
        sx={{
          justifyContent: { xs: 'center', sm: 'space-between' },
          gap: 2,
        }}>
        <Grid item sx={{}}>
          <CalendarStatistics setTimePeriod={setTimePeriod} />
        </Grid>
        <Grid item textAlign="right">
          <Typography component="h2">
            Total time spent in period: <b>{timeStringTotal}</b>
          </Typography>
        </Grid>
      </Grid>
      <Grid container gap={2}>
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
                          })}
                          | Time spent: {timeStringHelper(+totalTime)}
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
