import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import styles from './LightTile.css';

const materialStyles = {
  card: {
    minHeight: 700,
    maxWidth: 300,
  },
  media: {
    height: 350,
    margin: 'auto',
    paddingTop: '56.25%',
  },
};

const LightTile = props => (
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

LightTile.propTypes = {
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

LightTile.defaultProps = {
  subtitle: '',
};

export default withStyles(materialStyles)(LightTile);
