import { useState } from 'react';

import { Box, Menu, MenuItem } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setProjectToTimer } from '../../store/timeTrackerSlice';
import { FolderIcon } from '../../theme/appIcons';

const ProjectList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const { projectTitle } = useAppSelector((state) => state.timeTracker);
  const dispatch = useAppDispatch();
  const projectToShowArr = [{ title: '', id: '' }, ...projectsArr];
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    if (result.ariaLabel) {
      dispatch(
        setProjectToTimer({
          projectId: result.ariaLabel,
          projectTitle: result.innerText,
        })
      );
    } else {
      dispatch(
        setProjectToTimer({
          projectId: '',
          projectTitle: '',
        })
      );
    }
    setAnchorEl(null);
  };

  return (
    <Box my="auto" mr={2}>
      {projectTitle ? (
        <Box onClick={handleClick} sx={{ ':hover': { cursor: 'pointer' } }}>
          {projectTitle}
        </Box>
      ) : (
        <Box onClick={handleClick}>
          <FolderIcon style={{ color: 'gray' }} />
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
        {projectToShowArr.map(({ id, title }) => (
          <MenuItem aria-label={id} key={id} onClick={handleClose}>
            {title || 'No Project'}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProjectList;
