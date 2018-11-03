import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Tile from './Tile';

const materialStyles = {
  root: {
    flexGrow: 1,
  },
};

const TileDeck = props => (
  <Grid container justify="center">
    { props.data.map((dataElement, index) => (
      <Grid item key={index}>
        <Tile {...dataElement} />
      </Grid>
    ))}
  </Grid>
);

TileDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    imageComponent: PropTypes.node.isRequired,
    contentComponent: PropTypes.node.isRequired,
  })).isRequired,
};

export default withStyles(materialStyles)(TileDeck);
