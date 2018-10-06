import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tile.css';

const Tile = props => (
  <div className={styles.card}>
    <div className={styles.cardMedia}>
      {props.imageComponent}
    </div>
    <div className={styles.cardContent}>
      {props.contentComponent}
    </div>
  </div>
);

Tile.propTypes = {
  imageComponent: PropTypes.node.isRequired,
  contentComponent: PropTypes.node.isRequired,
};

export default Tile;
