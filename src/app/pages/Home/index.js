import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.button} onClick={() => navigate('/scrollEvent')}>OnScrollEvent</div>
      <div className={styles.button} onClick={() => navigate('/observer')}>Observer</div>
    </div>
  );
};

export default Home;
