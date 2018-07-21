import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import customStyles from './Banner.css';

const Banner = props => (
  <Jumbotron style={{ height: '100vh' }}>
    <BackgroundImage
      src={props.src}
      backgroundSize="cover"
      backgroundPosition="top left"
      backgroundAttachment="local"
    />
    <div className={customStyles.content}>
      {props.children}
    </div>
  </Jumbotron>
);

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Banner.defaultProps = {
  children: null,
};

export default Banner;
