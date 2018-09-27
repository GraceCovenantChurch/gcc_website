import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Tile from './Tile';
import LightTile from './LightTile';

const materialStyles = {
  root: {
    flexGrow: 1,
  },
};

const TileDeck = props => (
  <Grid container justify="center" className={props.classes.root} spacing={40}>
    { props.data.map(dataElement => (
      <Grid item key={dataElement.imageTitle}>
        { props.light ? <LightTile {...dataElement} /> : <Tile {...dataElement} /> }
      </Grid>
    ))}
  </Grid>
);

TileDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
  })).isRequired,
  light: PropTypes.bool,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

TileDeck.defaultProps = {
  light: false
};

export default withStyles(materialStyles)(TileDeck);
