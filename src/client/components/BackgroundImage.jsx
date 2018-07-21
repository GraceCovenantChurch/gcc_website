import React from 'react';
import PropTypes from 'prop-types';
import Optional from './Optional';

import customStyles from './BackgroundImage.css';

const BackgroundImage = props => (
  <div
    className={customStyles.backgroundImageContainer}
    style={{ zIndex: props.zIndex }}
  >
    <div
      className={customStyles.backgroundImage}
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundAttachment: props.backgroundAttachment,
        backgroundPosition: props.backgroundPosition,
        backgroundRepeat: props.backgroundRepeat,
        backgroundOrigin: props.backgroundOrigin,
        backgroundSize: props.backgroundSize,
        backgroundColor: props.backgroundColor,
        filter: props.backgroundFilter,
      }}
    >
      {props.children}
    </div>
    <Optional test={props.overlay}>
      <div
        className={customStyles.backgroundImageOverlay}
        style={{
          background: props.overlay,
        }}
      />
    </Optional>
  </div>
);

BackgroundImage.propTypes = {
  zIndex: PropTypes.number,
  src: PropTypes.string,
  backgroundAttachment: PropTypes.string,
  backgroundPosition: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  backgroundOrigin: PropTypes.string,
  backgroundSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundFilter: PropTypes.string,
  overlay: PropTypes.string,
  children: PropTypes.node,
};

BackgroundImage.defaultProps = {
  zIndex: undefined,
  src: '',
  backgroundAttachment: undefined,
  backgroundPosition: undefined,
  backgroundRepeat: undefined,
  backgroundOrigin: undefined,
  backgroundSize: undefined,
  backgroundColor: undefined,
  backgroundFilter: undefined,
  overlay: undefined,
  children: null,
};

export default BackgroundImage;
