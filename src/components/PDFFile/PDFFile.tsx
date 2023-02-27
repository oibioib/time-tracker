import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

import robotoFontSource from '../../assets/fonts/roboto.ttf';
import { HOURS_IN_MILISEC } from '../../constants/appConstants';
import generateInvoiceNumber from '../../helpers/invoiceHelpers';
import { PDFFileProp } from '../../types/trackerInterfaces';

Font.register({
  family: 'Roboto',
  src: robotoFontSource,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
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

const PDFFIle = ({ timersArr, pageTitle, startDate, endDate }: PDFFileProp) => {
  const { i18n, t } = useTranslation();
  const languageHelper = `${i18n.language === 'en' ? 'en-US' : 'ru'}`;
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  const period = `${start.toLocaleDateString(languageHelper, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })} - ${end.toLocaleDateString(languageHelper, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titleContainer}>
          <Text style={styles.reportTitle}>{t('DPFFile.invoice')}</Text>
        </Text>
        <Text style={{ textAlign: 'right', marginTop: 36 }}>
          <Text>{t('DPFFile.no')}: </Text>
          <Text
            style={{
              fontSize: 14,
            }}>
            {generateInvoiceNumber()}
          </Text>
        </Text>
        <Text style={{ textAlign: 'right' }}>
          <Text>{t('DPFFile.date')}: </Text>
          <Text style={{ fontSize: 14 }}>
            {today.toLocaleDateString(languageHelper, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </Text>
        <Text style={{ marginTop: 20 }}>
          {t('DPFFile.project')}: {pageTitle}
        </Text>
        <Text>
          <Text style={{ fontSize: 14 }}>{period}</Text>
        </Text>
        <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row' }}>
          <Text style={{ backgroundColor: 'grey', width: '60%' }}>
            {t('DPFFile.completedWorks')}
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '10%',
              textAlign: 'center',
            }}>
            {t('DPFFile.hours')}
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '15%',
              textAlign: 'center',
            }}>
            {t('DPFFile.perH')}
          </Text>
          <Text
            style={{
              backgroundColor: 'grey',
              width: '15%',
              textAlign: 'center',
            }}>
            {t('DPFFile.total')}
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
          <Text style={{ width: '85%', fontSize: 14 }}>
            {t('DPFFile.totalAmount')}
          </Text>
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
      </Page>
    </Document>
  );
};

export default PDFFIle;
