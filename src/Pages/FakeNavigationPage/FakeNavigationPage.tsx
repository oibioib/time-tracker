import { Link, Outlet } from 'react-router-dom';

import { ROUTES } from '../../constants';
import styles from './FakeNavigationPage.module.css';

const FakeNavigationPage = () => {
  return (
    <>
      <button className={styles.button} type="button">
        <Link to="/">main page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={ROUTES.LOGIN}>Login page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={ROUTES.DASHBOARD}>Dashboard/timer view</Link>
      </button>
      <Outlet />
    </>
  );
};

export default FakeNavigationPage;
