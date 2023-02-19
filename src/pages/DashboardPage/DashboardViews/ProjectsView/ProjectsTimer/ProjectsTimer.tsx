import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { getProjectTimers } from '../../../../../api/serverApi';
import CalendarStatistics from '../../../../../components/SelectStatistics';
import {
  DEFAULT_END_TODAY_TIMESTAMP,
  DEFAULT_STARTDAY_PREV_WEEK_TIMESTAMP,
} from '../../../../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { addTimePeriod } from '../../../../../store/statisticSlice';
import { TimerData } from '../../../../../types/trackerInterfaces';

const ProjectsTimer = () => {
  const { projectId } = useParams();
  const { timePeriod } = useAppSelector((state) => state.statistics);
  const [timersArr, setTimersArr] = useState<TimerData[]>([]);
  const [startDate, endDate] = timePeriod;
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (projectId) {
        const data = await getProjectTimers(projectId, startDate, endDate);
        setTimersArr(data);
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

  return (
    <div>
      ProjectsTimer
      <Box>PRINT PDF - in future</Box>
      <CalendarStatistics />
      {timersArr.map(
        ({ id, startTime, title, totalTime, project }: TimerData) => {
          const startingDate = new Date(+startTime);
          return (
            // Могу потом добавить возможность удалять проекты от сюда
            <div key={id}>
              <Box>title: {title}</Box>
              <Box>
                startTime:
                {startingDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Box>
              <Box>id: {id}</Box>
              totalTime:
              {totalTime} projectColor: {project.color}
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProjectsTimer;
