import React from 'react';
import PropTypes from 'prop-types';
import { TV } from '../';
import styles from './index.module.scss';

const Container = ({ children }) => {
  return (
    <div className={styles.container}>
      <TV />
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
