import styles from './index.module.scss';
import { TV } from './components';
import { DemoOnScrollEvent, DemoObserver } from './demos';

const App = () => {
  return (
    <div className={styles.container}>
      <TV />
      {/* <DemoOnScrollEvent /> */}
      <DemoObserver />
    </div>
  );
};

export default App;
