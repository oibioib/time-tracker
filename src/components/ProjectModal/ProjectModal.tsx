import { MuiColorInput } from 'mui-color-input';
import { useRef, useState } from 'react';

import { Box, Button, Paper, TextField } from '@mui/material';

import { createUserProject, updateUserProject } from '../../api/serverApi';
import { DEFAULT_COLOR } from '../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { ProjectData } from '../../types/trackerInterfaces';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  height: '500px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

interface DefaultProjectParam {
  id: string;
  color: string;
  title: string;
  salary: string;
}

interface ProjectModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
  defaultProjectParam: DefaultProjectParam;
  setDefaultProjectParam: React.Dispatch<
    React.SetStateAction<DefaultProjectParam>
  >;
}

const ProjectModal = ({
  setIsOpen,
  setRefreshPage,
  refreshPage,
  defaultProjectParam,
  setDefaultProjectParam,
}: ProjectModalProps) => {
  const [projectName, setProjectName] = useState(defaultProjectParam.title);
  const [errMessage, setErrMessage] = useState('');
  const [color, setColor] = useState(defaultProjectParam.color);
  const [salary, setSalary] = useState(defaultProjectParam.salary);
  const createRef = useRef<HTMLButtonElement>(null);
  const updateRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && projectName) {
      if (updateRef.current && defaultProjectParam.id) {
        updateRef.current.click();
      }
      if (createRef.current) {
        createRef.current.click();
      }
    }
  };

  const helperFunction = async (func: () => Promise<void>) => {
    if (
      projectsArr
        .filter(
          (project: ProjectData) => project.title !== defaultProjectParam.title
        )
        .find((project: ProjectData) => project.title === projectName)
    ) {
      setErrMessage('The name is already existed');
      return;
    }
    if (projectName === '') {
      setErrMessage('The name can not be empty');
      return;
    }
    if (!errMessage) {
      try {
        await func();
      } catch (error) {
        dispatch(setErrorMessage('Failed to create Project'));
      }
    }
    setRefreshPage(!refreshPage);
    setDefaultProjectParam({
      id: '',
      title: '',
      color: DEFAULT_COLOR,
      salary: '',
    });
    setIsOpen(false);
  };

  const onClickHandler = () => {
    helperFunction(async () => {
      await createUserProject(serverUserId, projectName, salary, color);
    });
  };

  const onCloseHandler = () => {
    setDefaultProjectParam({
      id: '',
      title: '',
      color: '',
      salary: '',
    });
    setIsOpen(false);
  };

  const colorHandler = (colors: string) => {
    setColor(colors);
  };

  const numberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(event.target.value);
  };

  const onUpdateHandler = () => {
    helperFunction(async () => {
      await updateUserProject(
        defaultProjectParam.id,
        projectName,
        salary,
        color
      );
    });
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

      <Box>Name</Box>
      <TextField
        required
        error={Boolean(errMessage)}
        label={errMessage ? 'Error' : 'Required'}
        placeholder="Project Name"
        value={projectName}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        helperText={errMessage}
        onFocus={() => {
          setErrMessage('');
        }}
      />
      <Box>Rate: $/h</Box>
      <TextField
        type="number"
        onChange={numberHandler}
        onKeyDown={onKeyDownHandler}
        value={salary}
      />
      <Box>Color</Box>
      <MuiColorInput
        format="hex"
        value={color}
        onChange={colorHandler}
        onKeyDown={onKeyDownHandler}
      />

      <Box>
        {defaultProjectParam.id ? (
          <Button ref={updateRef} variant="contained" onClick={onUpdateHandler}>
            Updated Project
          </Button>
        ) : (
          <Button ref={createRef} variant="contained" onClick={onClickHandler}>
            Create Project
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ProjectModal;
