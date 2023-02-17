import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { Grid, Typography } from '@mui/material';

import EmptyViewStatistic from '../../../../components/EmptyView/EmptyViewStatistic';
import ProductivityBox from '../../../../components/Productivity';
import {
  CalendarStatistics,
  SelectX,
} from '../../../../components/SelectStatistics';
import { DURATION_OF_DAY } from '../../../../constants/appConstants';
import {
  convertationToDate,
  convertationToMin,
  generateColor,
  options,
} from '../../../../helpers/statisticsHelpers';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import {
  deleteDataInterval,
  deleteTotalData,
  getDataInterval,
  getTimersTime,
} from '../../../../store/statisticSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsView = () => {
  const dispatch = useAppDispatch();
  const errorGetTimersTime = useAppSelector(
    (state) => state.statistics.getTimersTimeError
  );
  const errorGetDataInterval = useAppSelector(
    (state) => state.statistics.getDataIntervalError
  );

  const statisticOpen = useAppSelector(
    (state) => state.statistics.isChangeCalendar
  );

  const statisticsValueY = useAppSelector(
    (state) => state.statistics.timePeriod
  );
  const rezStartDate = statisticsValueY[0];
  const rezEndDate = statisticsValueY[1];

  const intervalTotalData = useAppSelector(
    (state) => state.statistics.dataTotalTime
  );
  const intervalData = useAppSelector((state) => state.statistics.dataInterval);
  const statisticsValueX = useAppSelector((state) => state.statistics.valueX);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  useEffect(() => {
    if (serverUserId) {
      if (statisticsValueX === 'tasks') {
        dispatch(getDataInterval({ serverUserId, rezStartDate, rezEndDate }));
        dispatch(deleteTotalData());
      } else {
        const dayAmount = Math.trunc(
          (rezEndDate - rezStartDate) / DURATION_OF_DAY
        );
        dispatch(getTimersTime({ serverUserId, rezStartDate, dayAmount }));
        dispatch(deleteDataInterval());
      }
    }
  }, [rezStartDate, rezEndDate, statisticsValueX, dispatch, serverUserId]);

  if (errorGetDataInterval) {
    dispatch(setErrorMessage(errorGetDataInterval));
  }
  if (errorGetTimersTime) {
    dispatch(setErrorMessage(errorGetTimersTime));
  }

  const totalTimeData = {
    labels: intervalTotalData.map((data) => convertationToDate(data.startTime)),
    datasets: [
      {
        label: 'Total time',
        data: intervalTotalData.map((data) =>
          convertationToMin(data.totalTime)
        ),
        backgroundColor: 'rgba(170, 135, 245, 1)',
      },
    ],
  };

  const selectedData = {
    labels: intervalData.map((data) => data.title),
    datasets: [
      {
        label: 'All tasks',
        data: intervalData.map((data) => convertationToMin(data.totalTime)),
        backgroundColor: intervalData.map(() => generateColor()),
      },
    ],
  };

  return (
    <Grid item container pt={1}>
      <Typography mb={0}>Statistics Page</Typography>
      <Grid item container justifyContent="space-around">
        <SelectX />
        <CalendarStatistics />
      </Grid>

      {intervalTotalData.length && statisticOpen ? (
        <Grid item container>
          <Grid item xs={11} sm={12} maxHeight={400}>
            <Bar data={totalTimeData} options={options} />
          </Grid>
          <ProductivityBox />
        </Grid>
      ) : null}

      {intervalData.length ? (
        <Grid item container>
          <Grid item xs={11} sm={12} maxHeight={400}>
            <Bar data={selectedData} options={options} />
          </Grid>
        </Grid>
      ) : null}
      {(intervalTotalData.length && statisticOpen) ||
      intervalData.length ? null : (
        <EmptyViewStatistic />
      )}
    </Grid>
  );
};

export default StatisticsView;
