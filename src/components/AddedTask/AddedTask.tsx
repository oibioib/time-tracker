import { useState } from 'react';

import { Box, Menu, MenuItem, Typography } from '@mui/material';

import { deleteTimer, updateTimer } from '../../api/serverApi';
import { DEFAULT_PROJECT_ID } from '../../constants/serverConstants';
import timeStringView from '../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { FolderIcon } from '../../theme/appIcons';
import { TaskArrReduced } from '../../types/trackerInterfaces';
import SmallTimer from '../SmallTimer/SmallTimer';

const AddedTask = ({
  taskStart,
  taskName,
  taskTimeSec,
  id,
  setRefreshPage,
  refreshPage,
  project,
}: TaskArrReduced) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const helperDate = new Date(taskTimeSec);
  const hours = helperDate.getUTCHours() || 0;
  const min = helperDate.getMinutes() || 0;
  const sec = helperDate.getSeconds() || 0;
  const timeString = timeStringView(sec, min, hours);
  const isTimerOn = useAppSelector((state) => state.timeTracker.isTimerOn);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const projectToShowArr = [
    { title: '', id: DEFAULT_PROJECT_ID },
    ...projectsArr,
  ];
  const open = Boolean(anchorEl);

  const onClickHandler = async () => {
    try {
      if (!isTimerOn) {
        await deleteTimer(id);
        setRefreshPage(!refreshPage);
      } else {
        dispatch(setErrorMessage('Please stop timer, to delete one'));
      }
    } catch (error) {
      dispatch(setErrorMessage('Failed to delete timer'));
    }
  };

  const onProjectChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    if (!isTimerOn) {
      try {
        if (result.dataset.id) {
          await updateTimer(taskName, 0, taskTimeSec, id, result.dataset.id);
          setRefreshPage(!refreshPage);
        }
      } catch (err) {
        dispatch(setErrorMessage('Failed to update timer project'));
      }
    } else {
      dispatch(setErrorMessage('Please stop timer, to update project'));
    }

    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Box>
        <Box>
          <Typography variant="body2">
            <b>{taskStart}</b>
          </Typography>
        </Box>
        <Box my={1}>{taskName}</Box>
      </Box>
      <Box bgcolor={project?.color} onClick={onProjectChangeHandler}>
        {project?.id ? (
          <Typography variant="body2">
            Project: <b>{project?.title}</b>
          </Typography>
        ) : (
          <FolderIcon style={{ color: 'gray' }} />
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200,
          },
        }}>
        {projectToShowArr.map((item) => (
          <MenuItem data-id={item.id} key={item.id} onClick={handleClose}>
            {item.title || 'No Project'}
          </MenuItem>
        ))}
      </Menu>
      <Box sx={{ display: 'flex' }}>
        <Box mr={3}>
          <Box mr={2} sx={{ display: 'flex' }}>
            <Typography variant="body2">Time spend: {timeString}</Typography>
            <Box
              onClick={onClickHandler}
              ml={1}
              sx={{ ':hover': { cursor: 'pointer' } }}>
              <Typography variant="body2" sx={{ color: 'coral' }}>
                del
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={1}>
            <Typography variant="body2">Press to resume</Typography>
            <Box mr={1} mt={-1}>
              <SmallTimer
                timerTitle={taskName}
                timerId={id}
                totalTime={taskTimeSec}
                project={project}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddedTask;
