import { useState } from 'react';

import { Box, Button, Paper, TextField } from '@mui/material';

import { createUserProject } from '../../api/serverApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { ProjectData } from '../../types/trackerInterfaces';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  height: '300px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

interface ProjectModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
}

const ProjectModal = ({
  setIsOpen,
  setRefreshPage,
  refreshPage,
}: ProjectModalProps) => {
  const [projectName, setProjectName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useAppDispatch();
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  const onClickHandler = async () => {
    if (
      projectsArr.find((project: ProjectData) => project.title === projectName)
    ) {
      setErrMessage('The name is already existed');
      return;
    }
    if (projectName === '') {
      setErrMessage('The name can not be empty');
      return;
    }
    try {
      await createUserProject(serverUserId, projectName);
    } catch (error) {
      dispatch(setErrorMessage('Failed to create Project'));
    }
    setRefreshPage(!refreshPage);
    setIsOpen(false);
  };

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <Paper sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>Create new Project</Box>
        <Box
          onClick={onCloseHandler}
          mt={-2}
          sx={{ ':hover': { cursor: 'pointer' } }}>
          x
        </Box>
      </Box>
      <Box>
        <Box>Name</Box>
        <TextField
          required
          error={Boolean(errMessage)}
          label={errMessage ? 'Error' : 'Required'}
          placeholder="Project Name"
          value={projectName}
          onChange={onChangeHandler}
          helperText={errMessage}
          onFocus={() => {
            setErrMessage('');
          }}
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={onClickHandler}>
          Create Project
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectModal;
