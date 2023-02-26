import { MuiColorInput } from 'mui-color-input';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';

import { createUserProject, updateUserProject } from '../../api/serverApi';
import { DEFAULT_COLOR } from '../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setErrorMessage } from '../../store/errorHandler';
import { setProjectToTimer } from '../../store/timeTrackerSlice';
import { CloseIcon } from '../../theme/appIcons';
import { ProjectData } from '../../types/trackerInterfaces';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  gap: 3,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minWidth: 300,
};

const styleTextFild = {
  '& label.Mui-focused': {
    color: 'third.main',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'third.main',
    },
  },
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
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState(defaultProjectParam.title);
  const [errMessage, setErrMessage] = useState('');
  const [color, setColor] = useState(defaultProjectParam.color);
  const [salary, setSalary] = useState(defaultProjectParam.salary);
  const createRef = useRef<HTMLButtonElement>(null);
  const updateRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const defaultParam = { id: '', title: '', color: DEFAULT_COLOR, salary: '' };
  const chosenProjectId = useAppSelector(
    (state) => state.timeTracker.projectId
  );

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
    if (projectName.trim() === '') {
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
    setDefaultProjectParam(defaultParam);
    setIsOpen(false);
  };

  const onClickHandler = () => {
    helperFunction(async () => {
      await createUserProject(serverUserId, projectName, salary, color);
    });
  };

  const onCloseHandler = () => {
    setDefaultProjectParam(defaultParam);
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
    if (chosenProjectId === defaultProjectParam.id) {
      dispatch(
        setProjectToTimer({
          projectId: defaultProjectParam.id,
          projectTitle: projectName,
          projectColor: color,
        })
      );
    }
  };

  return (
    <Paper sx={style}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="span" variant="h6">
          {t('projects.createNew')}
        </Typography>
        <Box onClick={onCloseHandler} mt={-2} mr={-2}>
          <CloseIcon
            sx={{
              color: 'text.disabled',
              ':hover': {
                cursor: 'pointer',
                color: 'accent.main',
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
                transition: 'transform 0.2s linear',
              },
            }}
          />
        </Box>
      </Box>
      <TextField
        required
        error={Boolean(errMessage)}
        label={t('projects.projectName')}
        InputLabelProps={{ shrink: true }}
        value={projectName}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        helperText={errMessage}
        onFocus={() => {
          setErrMessage('');
        }}
        sx={styleTextFild}
      />
      <TextField
        label={`${t('projects.projectRate')}: $/h`}
        InputLabelProps={{ shrink: true }}
        type="number"
        onChange={numberHandler}
        onKeyDown={onKeyDownHandler}
        value={salary}
        sx={styleTextFild}
      />
      <MuiColorInput
        format="hex"
        label={t('projects.projectColor')}
        value={color}
        onChange={colorHandler}
        onKeyDown={onKeyDownHandler}
        sx={styleTextFild}
        isAlphaHidden={true}
      />
      <Box textAlign="center">
        {defaultProjectParam.id ? (
          <Button
            ref={updateRef}
            variant="contained"
            size="large"
            onClick={onUpdateHandler}>
            Updated Project
          </Button>
        ) : (
          <Button
            ref={createRef}
            variant="contained"
            size="large"
            onClick={onClickHandler}>
            Create Project
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ProjectModal;
