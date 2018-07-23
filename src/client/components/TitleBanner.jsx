import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import styles from './TitleBanner.css';
import templateStyles from '../templates/MainTemplate.css';

const TitleBanner = props => (
  <Jumbotron style={{ height: '100vh' }}>
    <BackgroundImage
      src={props.src}
      backgroundSize="cover"
      backgroundPosition={props.backgroundPosition}
      backgroundAttachment="local"
    />
    <Center horizontal vertical>
      <div
        className={classnames(styles.titleText, templateStyles.header)}
        style={{ color: 'white' }}
      >
        { props.children }
      </div>
    </Center>
  </Jumbotron>
);

TitleBanner.propTypes = {
  src: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.string,
  children: PropTypes.node.isRequired,
};

TitleBanner.defaultProps = {
  backgroundPosition: 'center',
};

export default TitleBanner;
