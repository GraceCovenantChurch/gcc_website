import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './Tile.css';

const materialStyles = {
  card: {
    minHeight: 700,
    maxHeight: 1500,
    maxWidth: 500,
  },
  media: {
    height: 500,
    margin: 'auto',
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
      {props.subtitle && <div className={styles.cardSubtitle}>{props.subtitle}</div>}
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
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
  }).isRequired,
};

Tile.defaultProps = {
  subtitle: '',
};

export default withStyles(materialStyles)(Tile);
