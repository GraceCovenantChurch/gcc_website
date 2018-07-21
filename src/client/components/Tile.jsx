import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import customStyles from './Tile.css';

const styles = {
  card: {
    height: 500,
    maxWidth: 345,
  },
  media: {
    height: 0,
    margin: 'auto',
    maxWidth: 150,
    paddingTop: '56.25%',
  },
};

class Tile extends Component {
  render() {
    let { image, imageTitle, title, description, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title={imageTitle}
        />
        <CardContent className={customStyles.cardContent}>
          <h4 className={customStyles.cardTitle}>
            {title}
          </h4>
          <p className={customStyles.cardDescription}>
            {description}
          </p>
        </CardContent>
      </Card>
    );
  }
}

Tile.propTypes = {
  image: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Tile);
