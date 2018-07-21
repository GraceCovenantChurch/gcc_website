import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Tile from './Tile';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const TileDeck = props => (
  <Grid container justify="center" className={props.classes.root} spacing={40}>
    { props.data.map(dataElement => (
      <Grid item key={dataElement.imageTitle}>
        <Tile
          image={dataElement.image}
          imageTitle={dataElement.imageTitle}
          title={dataElement.title}
          description={dataElement.description}
        />
      </Grid>
    ))}
  </Grid>
);

TileDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(TileDeck);
