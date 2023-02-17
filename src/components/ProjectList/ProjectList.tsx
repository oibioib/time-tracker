import { useState } from 'react';

import { Box, Menu, MenuItem, Tooltip } from '@mui/material';

import { DEFAULT_PROJECT_ID } from '../../constants/serverConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProjectToTimer } from '../../store/timeTrackerSlice';
import { CircleIcon, FolderIcon } from '../../theme/appIcons';

const ProjectList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isToolTipOpen, setIsTookTipOpen] = useState(false);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const { projectTitle, projectColor } = useAppSelector(
    (state) => state.timeTracker
  );
  const dispatch = useAppDispatch();
  const projectToShowArr = [
    { title: '', id: DEFAULT_PROJECT_ID, color: '' },
    ...projectsArr,
  ];
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsTookTipOpen(false);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    if (result.ariaLabel) {
      dispatch(
        setProjectToTimer({
          projectId: result.ariaLabel,
          projectTitle: result.innerText,
          projectColor: result.dataset.color,
        })
      );
    } else {
      dispatch(
        setProjectToTimer({
          projectId: DEFAULT_PROJECT_ID,
          projectTitle: '',
        })
      );
    }
    setAnchorEl(null);
  };

  return (
    <Tooltip title="add project" placement="left-start" open={isToolTipOpen}>
      <Box my="auto" mr={2} sx={{ ':hover': { cursor: 'pointer' } }}>
        {projectTitle ? (
          <Box onClick={handleClick} sx={{ ':hover': { cursor: 'pointer' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <CircleIcon
                sx={{
                  color: `${projectColor}`,
                  width: '15px',
                }}
              />
              <Box>{projectTitle}</Box>
            </Box>
          </Box>
        ) : (
          <Box onClick={handleClick}>
            <FolderIcon
              style={{ color: 'gray' }}
              onMouseLeave={() => {
                setIsTookTipOpen(false);
              }}
              onMouseMove={() => {
                setIsTookTipOpen(true);
              }}
            />
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 200,
            },
          }}>
          {projectToShowArr.map(({ id, title, color }) => (
            <MenuItem
              aria-label={id}
              key={id}
              onClick={handleClose}
              data-color={color}>
              {title || 'No Project'}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Tooltip>
  );
};

export default ProjectList;
