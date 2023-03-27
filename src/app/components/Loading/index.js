import { Spinner } from '../';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Loading = ({ items, page }) => {
  const renderShimmer = (() => {
    if (page !== 1) return;

    const shimmerSize = 12 - (items.length % 6);
    const shimmerArray = [...new Array(shimmerSize)];
    const shimmer = shimmerArray.map((_, idx) => <div key={idx} className={styles.shimmer} />);
    return shimmer;
  })();

  return (
    <>
      {renderShimmer}
      <Spinner />
    </>
  );
};

Loading.propTypes = {
  items: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
};

export default Loading;
