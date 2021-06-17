import { useHistory } from "react-router-dom";
import styles from './index.module.scss';

const Home = () => {
  const history = useHistory();

  const navigateTo = path => history.push(path);

  return (
    <div className={styles.home}>
      <div className={styles.button} onClick={() => navigateTo('/scrollEvent')}>OnScrollEvent</div>
      <div className={styles.button} onClick={() => navigateTo('/observer')}>Observer</div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
