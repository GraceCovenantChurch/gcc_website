import React, {Component} from 'react';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./BackgroundImage.css');

class BackgroundImage extends Component {
  render() {
    return (
      <div className="background-image-container" style={{
        zIndex: this.props.zIndex,
      }}>
        <div className="background-image" style={{
          backgroundImage: `url(${this.props.src})`,
          backgroundAttachment: this.props.backgroundAttachment,
          backgroundPosition: this.props.backgroundPosition,
          backgroundRepeat: this.props.backgroundRepeat,
          backgroundOrigin: this.props.backgroundOrigin,
          backgroundSize: this.props.backgroundSize,
          filter: this.props.backgroundFilter,
        }}>
          {this.props.children}
        </div>
        {this.props.overlay ? <div className="background-image-overlay" style={{
          background: this.props.overlay,
        }} /> : null }
      </div>
    );
  }
};

export default BackgroundImage;