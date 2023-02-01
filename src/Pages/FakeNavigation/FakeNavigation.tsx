import { Link, Outlet } from 'react-router-dom';

import { DASHBOARD, LOGIN } from '../../Constants/Constants';
import styles from './FakeNavigation.module.css';

const FakeNavigation = () => {
  return (
    <>
      <button className={styles.button} type="button">
        <Link to="/">main page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={LOGIN}>Login page</Link>
      </button>

      <button type="button" className={styles.button}>
        <Link to={DASHBOARD}>Dashboard/timer view</Link>
      </button>
      <Outlet />
    </>
  );
};

export default FakeNavigation;
