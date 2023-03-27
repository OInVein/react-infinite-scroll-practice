import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Content = ({ onScroll, children }) => (
  <section {...(onScroll && { onScroll })} className={styles.content}>
    {children}
  </section>
);

Content.propTypes = {
  onScroll: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Content.defaultProps = {
  onScroll: null,
};

export default Content;
