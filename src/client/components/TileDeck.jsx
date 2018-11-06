import React from 'react';
import PropTypes from 'prop-types';

import styles from './TileDeck.css';
import Tile from './Tile';

const TileDeck = props => (
  <div className={styles.tileDeck}>
    { props.data.map(dataElement => <Tile {...dataElement} />) }
  </div>
);

TileDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    imageComponent: PropTypes.node.isRequired,
    contentComponent: PropTypes.node.isRequired,
  })).isRequired,
};

export default TileDeck;
