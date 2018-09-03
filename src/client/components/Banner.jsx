import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';
import Center from './Center';

import styles from './Banner.css';

const Banner = props => (
  <Jumbotron style={{ height: '100vh' }}>
    <BackgroundImage
      src={props.src}
      backgroundSize="cover"
      backgroundPosition="top left"
      backgroundAttachment="local"
    />
    { props.centered &&
      <Center vertical horizontal>
        {props.children}
      </Center>
    }
    { !props.centered &&
      <div className={styles.content}>
       {props.children}
     </div>
    }
  </Jumbotron>
);

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.node,
  centered: PropTypes.bool
};

Banner.defaultProps = {
  children: null,
  centered: false
};

export default Banner;
