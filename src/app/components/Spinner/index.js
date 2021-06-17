import styles from './index.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerContainerBall} />
      <div className={styles.spinnerContainerBall} />
      <div className={styles.spinnerContainerBall} />
    </div>
  </div>
);

export default Spinner;
