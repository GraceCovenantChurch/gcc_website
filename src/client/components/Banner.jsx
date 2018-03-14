import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import styles from './Banner.css';

const Banner = props => (
  <Jumbotron style={{ height: '100vh' }}>
    <BackgroundImage
      src={props.src}
      backgroundSize="cover"
      backgroundPosition="top left"
      backgroundAttachment="local"
    />
    <div
      className={styles.title}
      style={{ color: 'white', top: `${props.topMargin}%` }}
    >
      {props.children}
    </div>
  </Jumbotron>
);

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  topMargin: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Banner.defaultProps = {
  children: null,
};

export default Banner;
