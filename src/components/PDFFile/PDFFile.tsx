import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { HOURS_IN_MILISEC } from '../../constants/appConstants';
import { TimerData } from '../../types/trackerInterfaces';

interface PDFFileProp {
  timersArr: TimerData[];
  pageTitle: string;
  startDate: number;
  endDate: number;
  personData: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 24,
    textAlign: 'center',
  },
  reportTitle: {
    letterSpacing: 4,
    fontSize: 25,
    textTransform: 'uppercase',
  },
});

const PDFFIle = ({
  timersArr,
  pageTitle,
  startDate,
  endDate,
  personData,
}: PDFFileProp) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const period = `${start.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })} - ${end.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;

  // if (!timersArr.length) {
  //   return (
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         <Text>No tasks where tracked in the chosen period</Text>
  //       </Page>
  //     </Document>
  //   );
  // }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Invoice</Text>
        </Text>
        <Text style={{ textAlign: 'right', marginTop: 36 }}>
          <Text>Invoice No:</Text>
          <Text
            style={{
              fontSize: 14,
            }}>{`${today.getUTCFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getMilliseconds()}`}</Text>
        </Text>
        <Text style={{ textAlign: 'right' }}>
          <Text>Date: </Text>
          <Text style={{ fontSize: 14 }}>
            {today.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </Text>
        <Text style={{ marginTop: 20 }}>Invoice to:</Text>
        <Text style={{ fontSize: 14 }}>{pageTitle}</Text>
        <Text>
          <Text>For the period: </Text>
          <Text style={{ fontSize: 14 }}>{period}</Text>
        </Text>
        <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row' }}>
          <Text style={{ backgroundColor: 'grey', width: '60%' }}>
            Time Description
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '10%',
              textAlign: 'center',
            }}>
            Hours
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '15%',
              textAlign: 'center',
            }}>
            $/H
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '15%',
              textAlign: 'center',
            }}>
            Total
          </Text>
        </View>
        {timersArr.map(({ project, id, totalTime, title }) => {
          const timerProject = project.salary;
          return (
            <View
              key={id}
              style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
              <Text style={{ width: '60%' }}>{title}</Text>
              <Text style={{ width: '10%', textAlign: 'center' }}>
                {Math.floor(totalTime / HOURS_IN_MILISEC)}
              </Text>
              <Text style={{ width: '15%', textAlign: 'center' }}>
                {project.salary}
              </Text>
              <Text style={{ width: '15%', textAlign: 'center' }}>
                {timerProject &&
                  +timerProject * Math.floor(totalTime / HOURS_IN_MILISEC)}
              </Text>
            </View>
          );
        })}
        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
          <Text style={{ width: '85%', fontSize: 14 }}>Total Sum</Text>
          <Text style={{ width: '15%', textAlign: 'center', fontSize: 14 }}>
            {`${timersArr
              .reduce((acc, cur) => {
                const timerProject = cur?.project.salary;
                if (timerProject) {
                  const sum =
                    acc +
                    +timerProject *
                      Math.floor(cur.totalTime / HOURS_IN_MILISEC);
                  return sum;
                }
                return 0;
              }, 0)
              .toFixed(2)}$`}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, marginTop: 36 }}>{personData}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFIle;
