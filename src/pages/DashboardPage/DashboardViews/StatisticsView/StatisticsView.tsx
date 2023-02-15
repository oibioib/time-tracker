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
import { Bar } from 'react-chartjs-2';

import { Grid, Typography } from '@mui/material';

import EmptyViewStatistic from '../../../../components/EmptyView/EmptyViewStatistic';
import { SelectX } from '../../../../components/SelectStatistics';
import CalendarStatistics from '../../../../components/SelectStatistics/CalendarStatistic';
import generateColor from '../../../../helpers/generateColor';
import { useAppSelector } from '../../../../hooks/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },

    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string) => `${value} min`,
      },
    },
  },
};

function convertationToMin(timeInMSec: string) {
  return Number(timeInMSec) / (1000 * 60);
}

const StatisticsView = () => {
  const intervalData = useAppSelector((state) => state.statistics.dataInterval);

  const userData = {
    labels: intervalData.map((data) => data.title),
    datasets: [
      {
        label: 'Tasks',
        data: intervalData.map((data) => convertationToMin(data.totalTime)),
        backgroundColor: intervalData.map(() => generateColor()),
      },
    ],
  };

  function convertationToDate(time: string) {
    const dateFormat = new Date(Number(time));
    return dateFormat.toLocaleDateString('en-GB');
  }

  const selectedData = {
    labels: intervalData.map((data) => convertationToDate(data.startTime)),
    datasets: [
      {
        label: 'Users Time',
        data: intervalData.map((data) => convertationToMin(data.totalTime)),
        backgroundColor: intervalData.map(() => generateColor()),
      },
    ],
  };

  return (
    <Grid item container pt={2}>
      <Typography>Statistics Page</Typography>
      <Grid item container justifyContent="space-between">
        <SelectX />
        {/* <SelectY /> */}
        <CalendarStatistics />
      </Grid>
      {/* <Grid item sx={{ width: { xs: '300', sm: '500' } }}>
        <Pie data={userData} options={options} />
      </Grid> */}
      {intervalData.length ? (
        <Grid item container>
          <Grid item xs={11} sm={12}>
            <Bar data={selectedData} options={options} />
          </Grid>
          <Grid item xs={11} sm={12}>
            <Bar data={userData} options={options} />
          </Grid>
        </Grid>
      ) : (
        <EmptyViewStatistic />
      )}
    </Grid>
  );
};

export default StatisticsView;
