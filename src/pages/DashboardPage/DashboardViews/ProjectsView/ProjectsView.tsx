import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Grid, Modal, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { deleteProject, getUserProjects } from '../../../../api/serverApi';
import ProjectModal from '../../../../components/ProjectModal/ProjectModal';
import { DEFAULT_COLOR } from '../../../../constants/appConstants';
import { timeStringHelper } from '../../../../helpers/timeString';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setProjectArr } from '../../../../store/projectSlice';
import { DeleteIcon, EditIcon } from '../../../../theme/appIcons';
import {
  iconsStyle,
  mainTitleTypography,
} from '../../../../theme/elementsStyles';

const ProjectsView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const dispatch = useAppDispatch();
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const defaultParam = {
    id: '',
    title: '',
    color: DEFAULT_COLOR,
    salary: '',
  };
  const [defaultProjectParam, setDefaultProjectParam] = useState(defaultParam);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onOpenHandler = () => {
    setIsOpen(true);
  };
  const onCloseHandler = () => {
    setDefaultProjectParam(defaultParam);
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (serverUserId) {
        try {
          const data = await getUserProjects(serverUserId);
          dispatch(setProjectArr(data));
        } catch {
          dispatch(setErrorMessage(`${t('errors.failedToGetProjects')}`));
        }
      }
    })();
  }, [serverUserId, refreshPage, dispatch, t]);

  const onDeleteHandler = async (event: React.MouseEvent<HTMLElement>) => {
    const result = event.currentTarget as HTMLElement;
    try {
      await deleteProject(result.id);
    } catch (error) {
      dispatch(setErrorMessage(`${t('errors.failedToDeleteProjects')}`));
    }
    setRefreshPage(!refreshPage);
  };

  const onChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    const result = event.currentTarget as HTMLElement;
    setDefaultProjectParam({
      id: result.dataset.id || '',
      title: result.dataset.title || '',
      color: result.dataset.color || DEFAULT_COLOR,
      salary: result.dataset.salary || '',
    });
    setIsOpen(true);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onCloseHandler}>
        <div>
          <ProjectModal
            setIsOpen={setIsOpen}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
            defaultProjectParam={defaultProjectParam}
            setDefaultProjectParam={setDefaultProjectParam}
          />
        </div>
      </Modal>

      <Grid container direction="column" gap={2}>
        <Typography component="h1" sx={mainTitleTypography}>
          {t(`dashboard.projectsView`)}
        </Typography>
        <Grid item container justifyContent="center" mb={4}>
          <Button
            onClick={onOpenHandler}
            variant="contained"
            sx={{ fontSize: '1.4rem' }}>
            {t('projects.addProject')}
          </Button>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          direction="column"
          borderRadius="5px"
          sx={{
            width: '100%',
            gap: { xs: 1, sm: 2 },
          }}>
          <Grid item container gap={1}>
            {projectsArr.length
              ? projectsArr.map(
                  ({ id, title, totalTime, color, salary, totalTimers }) => {
                    return (
                      <Paper
                        key={id}
                        elevation={0}
                        sx={{
                          p: { xs: 1, sm: 2 },
                          width: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}>
                        <Grid
                          item
                          container
                          xs={12}
                          alignItems="center"
                          sx={{
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              width: 3,
                              height: '100%',
                              backgroundColor: color,
                            },
                          }}>
                          <Grid
                            item
                            container
                            direction="column"
                            xs={12}
                            md={10}>
                            <Grid item mb={1}>
                              <Typography
                                component="h3"
                                variant="h6"
                                onClick={() => {
                                  navigate(`${id}`);
                                }}
                                sx={{
                                  display: 'inline',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  transition: '0.2s',
                                  '&:hover': {
                                    textDecoration: 'none',
                                    color: 'accent.main',
                                  },
                                }}>
                                {title}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              container
                              sx={{ gap: { xs: 1, sm: 2, md: 3 } }}>
                              <Typography component="span" variant="body2">
                                {t('timers.timeSpent')}:
                                <b> {timeStringHelper(+totalTime)}</b>
                              </Typography>
                              <Typography component="span" variant="body2">
                                {t('projects.allTimers')}: <b>{totalTimers}</b>
                              </Typography>
                              <Typography component="span" variant="body2">
                                {t('projects.projectRate')}: <b>{salary} $</b>
                              </Typography>
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
                            <IconButton
                              id={id}
                              onClick={onDeleteHandler}
                              title={`${t('projects.deleteProject')}`}>
                              <DeleteIcon sx={iconsStyle} />
                            </IconButton>
                            <IconButton
                              data-id={id}
                              data-title={title}
                              data-color={color}
                              data-salary={salary}
                              onClick={onChangeHandler}
                              title={`${t('projects.editProject')}`}>
                              <EditIcon sx={iconsStyle} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    );
                  }
                )
              : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectsView;
