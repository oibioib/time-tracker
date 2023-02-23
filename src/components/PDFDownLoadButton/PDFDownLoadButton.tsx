import { PDFDownloadLink } from '@react-pdf/renderer';

import { TimerData } from '../../types/trackerInterfaces';
import PDFFIle from '../PDFFile/PDFFile';

interface PDFDownLoadButtonProps {
  timersArr: TimerData[];
  pageTitle: string;
  startDate: number;
  endDate: number;
  personData: string;
}

const PDFDownLoadButton = ({
  timersArr,
  pageTitle,
  startDate,
  endDate,
  personData,
}: PDFDownLoadButtonProps) => {
  return (
    <PDFDownloadLink
      document={
        <PDFFIle
          timersArr={timersArr}
          pageTitle={pageTitle}
          startDate={startDate}
          endDate={endDate}
          personData={personData}
        />
      }
      fileName="FORM">
      {({ loading }) =>
        loading ? (
          <button type="button" disabled>
            Loding Document...
          </button>
        ) : (
          <button type="button">Download</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default PDFDownLoadButton;
