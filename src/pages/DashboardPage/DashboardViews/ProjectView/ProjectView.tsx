import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const PDFDownLoadButton = React.lazy(
  () => import('../../../../components/PDFDownLoadButton/PDFDownLoadButton')
);

const ProjectView = () => {
  const { t, i18n } = useTranslation();
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
          dispatch(setErrorMessage(`${t('errors.failedToGetProjectsTimers')}`));
        }
      }
    })();
  }, [projectId, startDate, endDate, dispatch, t]);

  if (!isTimersData) {
    return <Box> </Box>;
  }

  return (
    <Grid container direction="column">
      <Typography component="h1" sx={mainTitleTypography}>
        {pageTitle}
      </Typography>
      <Grid item mb={2}>
        <Suspense fallback={<div>Loading...</div>}>
          <PDFDownLoadButton
            timersArr={timersArr}
            pageTitle={pageTitle}
            startDate={startDate}
            endDate={endDate}
          />
        </Suspense>
      </Grid>
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
        <Grid item>
          <CalendarStatistics setTimePeriod={setTimePeriod} />
        </Grid>
        <Grid item textAlign="right">
          <Typography component="h2">
            {t('projects.timeSpentAll')}: <b>{timeStringTotal}</b>
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
                          {startingDate.toLocaleDateString(
                            `${i18n.language === 'en' ? 'en-US' : 'ru'}`,
                            {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                          | {t('projects.timeSpent')}:{' '}
                          {timeStringHelper(+totalTime)}
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
