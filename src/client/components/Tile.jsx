import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './Tile.css';

const materialStyles = {
  card: {
    height: 500,
    maxWidth: 350,
  },
  media: {
    height: 0,
    margin: 'auto',
    maxWidth: 150,
    paddingTop: '56.25%',
  },
};

const Tile = props => (
  <Card className={props.classes.card}>
    <CardMedia
      className={props.classes.media}
      image={props.image}
      title={props.imageTitle}
    />
    <CardContent className={styles.cardContent}>
      <h4 className={styles.cardTitle}>
        {props.title}
      </h4>
      <p className={styles.cardDescription}>
        {props.description}
      </p>
    </CardContent>
  </Card>
);

Tile.propTypes = {
  image: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(materialStyles)(Tile);
