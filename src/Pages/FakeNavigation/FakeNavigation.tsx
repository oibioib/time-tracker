import { Link, Outlet } from 'react-router-dom';

import { PagesRoutingNames } from '../../Constants/Constants';
import styles from './FakeNavigation.module.css';

const FakeNavigation = () => {
  return (
    <>
      <button className={styles.button} type="button">
        <Link to="/">main page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={PagesRoutingNames.LOGIN}>Login page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={PagesRoutingNames.DASHBOARD}>Dashboard/timer view</Link>
      </button>
      <Outlet />
    </>
  );
};

export default FakeNavigation;
