import { useState } from 'react';

import { Box, Grid, Menu, MenuItem, Tooltip } from '@mui/material';

import { DEFAULT_PROJECT_ID } from '../../constants/serverConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProjectToTimer } from '../../store/timeTrackerSlice';
import { FolderIcon } from '../../theme/appIcons';
import { iconsStyle } from '../../theme/elementsStyles';

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
      <Box my="auto" sx={{ ':hover': { cursor: 'pointer' } }}>
        {projectTitle ? (
          <Box onClick={handleClick} sx={{ ':hover': { cursor: 'pointer' } }}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  sx={{
                    mr: 0.5,
                    backgroundColor: `${projectColor}`,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Grid>
              <Grid item>{projectTitle}</Grid>
            </Grid>
          </Box>
        ) : (
          <Box onClick={handleClick}>
            <FolderIcon
              sx={iconsStyle}
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
