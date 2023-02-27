import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';

import { PictureAsPdfIcon } from '../../theme/appIcons';
import { PDFFileProp } from '../../types/trackerInterfaces';
import PDFFIle from '../PDFFile/PDFFile';

const PDFDownLoadButton = ({
  timersArr,
  pageTitle,
  startDate,
  endDate,
}: PDFFileProp) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ '& a': { textDecoration: 'none' } }}>
      <PDFDownloadLink
        document={
          <PDFFIle
            timersArr={timersArr}
            pageTitle={pageTitle}
            startDate={startDate}
            endDate={endDate}
          />
        }
        fileName="invoice">
        {({ loading }) => (
          <Button
            variant="contained"
            disabled={loading}
            endIcon={<PictureAsPdfIcon />}>
            {loading
              ? t('projects.loadingInvoice')
              : t('projects.downloadInvoice')}
          </Button>
        )}
      </PDFDownloadLink>
    </Box>
  );
};

export default PDFDownLoadButton;
