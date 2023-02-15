import { useEffect, useState } from 'react';

import { Box, Button, Grid, Modal, Paper } from '@mui/material';

import { deleteProject, getUserProjects } from '../../../../api/serverApi';
import ProjectModal from '../../../../components/ProjectModal/ProjectModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setErrorMessage } from '../../../../store/errorHandler';
import { setProjectArr } from '../../../../store/projectSlice';

const ProjectsView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const onOpenHandler = () => {
    setIsOpen(true);
  };
  const onCloseHandler = () => {
    setIsOpen(false);
  };
  const { projectsArr } = useAppSelector((state) => state.projectArr);
  const dispatch = useAppDispatch();
  const serverUserId = useAppSelector((state) => state.serverUserData.id);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProjects(serverUserId);
        dispatch(setProjectArr(data));
      } catch {
        dispatch(setErrorMessage('Failed to get user projects'));
      }
    })();
  }, [serverUserId, refreshPage, dispatch]);

  const onClickHandler = async (event: React.MouseEvent<HTMLElement>) => {
    const result = event.target as HTMLElement;
    try {
      console.log(result.id);
      await deleteProject(result.id);
    } catch (error) {
      dispatch(setErrorMessage('Failed to delete project'));
    }
    setRefreshPage(!refreshPage);
  };

  console.log(projectsArr);

  return (
    <>
      <Modal open={isOpen} onClose={onCloseHandler}>
        <div>
          <ProjectModal
            setIsOpen={setIsOpen}
            refreshPage={refreshPage}
            setRefreshPage={setRefreshPage}
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
        <Grid item xs={12} my={2}>
          <Grid container height={40}>
            <Grid item xs={4}>
              <b>Project Name</b>
            </Grid>
            <Grid item xs={4}>
              total minutes
            </Grid>
            <Grid item xs={4}>
              del
            </Grid>
          </Grid>
        </Grid>
        {projectsArr.length
          ? projectsArr.map(({ id, title, totalTime }) => {
              return (
                <Grid item xs={12} key={id} my={2}>
                  <Paper>
                    <Grid container height={40}>
                      <Grid item xs={4}>
                        {title}
                      </Grid>
                      <Grid item xs={4}>
                        {Math.floor(totalTime / 1000 / 60)}
                      </Grid>
                      <Grid
                        id={id}
                        item
                        xs={4}
                        onClick={onClickHandler}
                        sx={{ ':hover': { cursor: 'pointer' } }}>
                        del
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })
          : ''}
      </Grid>
    </>
  );
};

export default ProjectsView;
