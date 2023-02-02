import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import LangSwitch from '../../Components/LangSwitch';
import { PagesRoutingNames } from '../../Constants/Constants';
import styles from './FakeNavigation.module.css';

const FakeNavigation = () => {
  const { t } = useTranslation();
  return (
    <>
      <button className={styles.button} type="button">
        <Link to="/">{t('buttons.mainPage')}</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={PagesRoutingNames.LOGIN}>{t('buttons.loginPage')}</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={PagesRoutingNames.DASHBOARD}>
          {t('buttons.dashboardPage')}
        </Link>
      </button>
      <LangSwitch />
      <Outlet />
    </>
  );
};

export default FakeNavigation;
