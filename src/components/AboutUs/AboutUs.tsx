import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from '@mui/material';

import { ExpandMoreIcon } from '../../theme/appIcons';

const AboutUs = () => {
  return (
    <Grid item sx={{ maxWidth: 900 }} justifyContent="flex-start">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>About us </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>We tried to do it!</Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Avatar alt="person" src="./images/kot.jpg" />
              <Typography variant="body1" ml={2}>
                Павел
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">TeamLead, Backend,....</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Avatar alt="person" src="./images/kot.jpg" />
              <Typography variant="body1" ml={2}>
                Александр
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Authorization, Tracker,....
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Avatar alt="person" src="./images/kot.jpg" />
              <Typography variant="body1" ml={2}>
                Галина
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2"> Localization,....</Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default AboutUs;
