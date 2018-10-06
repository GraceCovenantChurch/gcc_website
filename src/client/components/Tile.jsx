import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tile.css';

<<<<<<< HEAD
const materialStyles = {
  card: {
    minHeight: 850,
    maxHeight: 1500,
    maxWidth: 350,
  },
  media: {
    height: 350,
    margin: 'auto',
    paddingTop: '56.25%',
  },
};

=======
>>>>>>> Major Tiledeck rehaul
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
