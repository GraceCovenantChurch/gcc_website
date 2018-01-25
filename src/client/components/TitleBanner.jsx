import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';
import { SparkScroll } from '../modules/spark.js';

import styles from './TitleBanner.css';

class TitleBanner extends Component {
  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src={ this.props.src }
          backgroundSize="cover"
          backgroundPosition={ this.props.backgroundPosition || 'center' }
          backgroundAttachment="local" />
          <Center horizontal vertical>
            <SparkScroll.h1
              className={styles.titleText}
              style={{ color: 'white' }}
              timeline={{
                centerCenter: { opacity: 1 },
                topTop: { opacity: 0 }
              }}>
              { this.props.children }
            </SparkScroll.h1>
          </Center>
      </Jumbotron>
    );
  }
};

TitleBanner.propTypes = {
  src: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.string,
};

export default TitleBanner;
