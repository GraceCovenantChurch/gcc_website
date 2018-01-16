import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AspectRatio extends Component {
  render() {
    return (
      <div style={{
        width: '100%',
        position: 'relative',
        paddingTop: `${100 / this.props.ratio}%`,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>{this.props.children}</div>
      </div>
    );
  }
};

AspectRatio.propTypes = {
  ratio: PropTypes.number.isRequired,
};

export default AspectRatio;
