import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import LangSwitch from '../../components/LangSwitch';
import { ROUTES } from '../../constants';
import styles from './FakeNavigationPage.module.css';

const FakeNavigationPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <button className={styles.button} type="button">
        <Link to="/">{t('buttons.mainPage')}</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={ROUTES.LOGIN}>{t('buttons.loginPage')}</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={ROUTES.DASHBOARD}>{t('buttons.dashboardPage')}</Link>
      </button>
      <LangSwitch />
      <Outlet />
    </>
  );
};

export default FakeNavigationPage;
