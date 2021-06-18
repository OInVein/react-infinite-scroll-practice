import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { genImagePath } from '../../utils';
import styles from './index.module.scss';

const MovieCard = forwardRef(({ title, src, onClick, onError }, ref) => (
  <div ref={ref} className={styles.imgContainer}>
    <div className={styles.easterEgg}>{title}</div>
    <img
      onClick={onClick}
      src={genImagePath(src)}
      className={styles.img}
      loading="lazy"
      onError={onError}
    />
  </div>
));

MovieCard.displayName = 'movieCard';

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default MovieCard;
