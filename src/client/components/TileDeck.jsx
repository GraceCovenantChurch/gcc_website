import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Tile from './Tile';

import customStyles from './Banner.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class TileDeck extends Component {
  render() {
    let { data, classes } = this.props;

    return (
      <Grid container justify="center" className={classes.root} spacing={40}>
        { data.map((dataElement, index) => (
          <Grid item key={index}>
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
  }
}

TileDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }))
};

export default withStyles(styles)(TileDeck);
