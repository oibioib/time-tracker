import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { deleteProject, getUserProjects } from '../../../../api/serverApi';
import ProjectModal from '../../../../components/ProjectModal/ProjectModal';
import {
  DEFAULT_COLOR,
  HOURS_IN_MILISEC,
} from '../../../../constants/appConstants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setProjectArr } from '../../../../store/projectSlice';
import { CircleIcon } from '../../../../theme/appIcons';
import { mainTitleTypography } from '../../../../theme/elementsStyles';

const ProjectsView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const dispatch = useAppDispatch();
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const [defaultProjectParam, setDefaultProjectParam] = useState({
    id: '',
    title: '',
    color: DEFAULT_COLOR,
    salary: '',
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onOpenHandler = () => {
    setIsOpen(true);
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

  useEffect(() => {
    (async () => {
      if (serverUserId) {
        try {
          const data = await getUserProjects(serverUserId);
          dispatch(setProjectArr(data));
        } catch {
          dispatch(setErrorMessage('Failed to get user projects'));
        }
      }
    })();
  }, [serverUserId, refreshPage, dispatch]);

  const onClickHandler = async (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    try {
      await deleteProject(result.id);
    } catch (error) {
      dispatch(setErrorMessage('Failed to delete project'));
    }
    setRefreshPage(!refreshPage);
  };

  const onChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    setDefaultProjectParam({
      id: result.dataset.id || '',
      title: result.dataset.title || '',
      color: result.dataset.color || '',
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
            + Project
          </Button>
        </Grid>
        <Grid item>
          {projectsArr.length ? (
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Time (Hours)</b>
                      </TableCell>
                      <TableCell>
                        <b>$/hour</b>
                      </TableCell>
                      <TableCell>
                        <b>Options</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectsArr.map(
                      ({ id, title, totalTime, color, salary }) => {
                        return (
                          <TableRow key={id}>
                            <TableCell>
                              <Box
                                onClick={() => {
                                  navigate(`${id}`);
                                }}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  ':hover': { cursor: 'pointer' },
                                }}>
                                <CircleIcon
                                  sx={{
                                    color: { color },
                                    width: '15px',
                                  }}
                                />
                                <Box>{title}</Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {Math.floor(totalTime / HOURS_IN_MILISEC) ||
                                '< 0'}
                            </TableCell>
                            <TableCell>{salary}</TableCell>
                            <TableCell>
                              <Box
                                color="coral"
                                id={id}
                                onClick={onClickHandler}
                                sx={{ ':hover': { cursor: 'pointer' } }}
                                mb={1}>
                                del
                              </Box>
                              <Box
                                data-id={id}
                                data-title={title}
                                data-color={color}
                                data-salary={salary}
                                onClick={onChangeHandler}
                                sx={{ ':hover': { cursor: 'pointer' } }}>
                                change
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>

      {/* <Grid container columns={4} sx={{ height: '100%' }}>
        <Grid item xs={12} my={2}>
          <Paper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Projects</Box>
              <Box>
                <Button onClick={onOpenHandler} variant="contained">
                  + Project
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box>Choose month</Box>
        </Grid>
        {projectsArr.length ? (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Time (Hours)</b>
                    </TableCell>
                    <TableCell>
                      <b>$/hour</b>
                    </TableCell>
                    <TableCell>
                      <b>Options</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectsArr.map(
                    ({ id, title, totalTime, color, salary }) => {
                      return (
                        <TableRow key={id}>
                          <TableCell>
                            <Box
                              onClick={() => {
                                navigate(`${id}`);
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ':hover': { cursor: 'pointer' },
                              }}>
                              <CircleIcon
                                sx={{
                                  color: { color },
                                  width: '15px',
                                }}
                              />
                              <Box>{title}</Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {Math.floor(totalTime / HOURS_IN_MILISEC) || '< 0'}
                          </TableCell>
                          <TableCell>{salary}</TableCell>
                          <TableCell>
                            <Box
                              color="coral"
                              id={id}
                              onClick={onClickHandler}
                              sx={{ ':hover': { cursor: 'pointer' } }}
                              mb={1}>
                              del
                            </Box>
                            <Box
                              data-id={id}
                              data-title={title}
                              data-color={color}
                              data-salary={salary}
                              onClick={onChangeHandler}
                              sx={{ ':hover': { cursor: 'pointer' } }}>
                              change
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          ''
        )}
      </Grid> */}
    </>
  );
};

export default ProjectsView;
