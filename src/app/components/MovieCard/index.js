import PropTypes from 'prop-types';
import { genImagePath } from '../../utils';
import styles from './index.module.scss';

const MovieCard = ({ title, src, onClick, onError }) => (
  <div className={styles.imgContainer}>
    <div className={styles.easterEgg}>{title}</div>
    <img
      onClick={onClick}
      src={genImagePath(src)}
      className={styles.img}
      alt={title}
      loading="lazy"
      onError={onError}
    />
  </div>
);

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default MovieCard;
