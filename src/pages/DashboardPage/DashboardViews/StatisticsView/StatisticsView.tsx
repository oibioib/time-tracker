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
import { Bar, Pie } from 'react-chartjs-2';

import { Grid, Typography } from '@mui/material';

import { SelectX } from '../../../../components/SelectStatistics';
import CalendarStatistics from '../../../../components/SelectStatistics/CalendarStatistic';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  createProjectUser,
  getAllTime,
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
};

export function generateColor() {
  const base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += base[Math.floor(Math.random() * base.length)];
  }
  return `#${code}`;
}

const StatisticsView = () => {
  const dispatch = useAppDispatch();
  const userGitHubData = useAppSelector((state) => state.gitHubFetch);
  // console.log('1', userGitHubData);
  useEffect(() => {
    if (userGitHubData) {
      dispatch(createProjectUser(userGitHubData));
    }
  }, [userGitHubData, dispatch]);

  const userProjectId = useAppSelector(
    (state) => state.statistics.createProjectUserData.id
  );
  // console.log('2', userProjectId);

  useEffect(() => {
    if (userProjectId) {
      dispatch(getAllTime(userProjectId));
    }
  }, [userProjectId, dispatch]);
  const statData = useAppSelector((state) => state.statistics.timersData);

  const userData = {
    labels: statData.map((data) => data.title),
    datasets: [
      {
        label: 'Users Time',
        data: statData.map((data) => data.totalTime),
        backgroundColor: statData.map(() => generateColor()),
        // backgroundColor: [
        //   'rgba(75,192,192,1)',
        //   '#ecf0f1',
        //   '#50AF95',
        //   '#f3ba2f',
        //   '#2a71d0',
        // ],
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
      <Grid item xs={11} sm={12}>
        <Bar data={userData} options={options} />
      </Grid>
      <Grid item sx={{ width: { xs: '300', sm: '500' } }}>
        <Pie data={userData} options={options} />
      </Grid>
    </Grid>
  );
};

export default StatisticsView;
