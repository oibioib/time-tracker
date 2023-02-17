import { useEffect, useState } from 'react';

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
} from '@mui/material';

import { deleteProject, getUserProjects } from '../../../../api/serverApi';
import ProjectModal from '../../../../components/ProjectModal/ProjectModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setProjectArr } from '../../../../store/projectSlice';

const ProjectsView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const dispatch = useAppDispatch();
  const serverUserId = useAppSelector((state) => state.serverUserData.id);
  const [defaultProjectParam, setDefaultProjectParam] = useState({
    id: '',
    title: '',
    color: '',
    salary: '',
  });
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
      <Grid container columns={4}>
        <Grid item xs={12} mt={2}>
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
                      <b>Time</b>
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
                            <Box bgcolor={color}>{title}</Box>
                          </TableCell>
                          <TableCell>{totalTime}</TableCell>
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
    </>
  );
};

export default ProjectsView;
