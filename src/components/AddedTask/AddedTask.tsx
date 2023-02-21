import { useState } from 'react';

import { Box, Menu, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import { deleteTimer, updateTimer } from '../../api/serverApi';
import { DEFAULT_PROJECT_ID } from '../../constants/serverConstants';
import timeStringView from '../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { DeleteIcon, FolderIcon } from '../../theme/appIcons';
import { iconsStyle } from '../../theme/elementsStyles';
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
    <Grid container alignItems="center">
      <Grid item container direction="column" xs={12} md={10}>
        <Grid item>
          <Typography component="h3" variant="h6">
            {taskName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {taskStart} | Time spend: {timeString}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            onClick={onProjectChangeHandler}
            sx={{ ':hover': { cursor: 'pointer' } }}>
            {project?.id ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Typography component="span" variant="body2" mr={1}>
                  Project:
                </Typography>
                <Box
                  sx={{
                    mr: 0.5,
                    backgroundColor: `${project?.color}`,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    {project?.title}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Grid container alignItems="center">
                <Typography component="span" variant="body2" mr={1}>
                  Project:
                </Typography>
                <FolderIcon sx={{ ...iconsStyle, fontSize: 18 }} />
              </Grid>
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
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={2}
        alignItems="center"
        sx={{
          justifyContent: { xs: 'center', sm: 'flex-end' },
          mt: { xs: 2, sm: 0 },
        }}>
        <IconButton onClick={onClickHandler} title="Delete">
          <DeleteIcon sx={iconsStyle} />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={1}>
          <Box mr={1} mt={-1}>
            <SmallTimer
              timerTitle={taskName}
              timerId={id}
              totalTime={taskTimeSec}
              project={project}
              refreshPage={refreshPage}
              setRefreshPage={setRefreshPage}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddedTask;
