import React, {Component} from 'react';
import classnames from 'classnames';
import styles from './BackgroundImage.css';

class BackgroundImage extends Component {
  render() {
    return (
      <div className={styles.backgroundImageContainer} style={{
        zIndex: this.props.zIndex,
      }}>
        <div className={styles.backgroundImage} style={{
          backgroundImage: `url(${this.props.src})`,
          backgroundAttachment: this.props.backgroundAttachment,
          backgroundPosition: this.props.backgroundPosition,
          backgroundRepeat: this.props.backgroundRepeat,
          backgroundOrigin: this.props.backgroundOrigin,
          backgroundSize: this.props.backgroundSize,
          backgroundColor: this.props.backgroundColor,
          filter: this.props.backgroundFilter,
        }}>
          {this.props.children}
        </div>
        {this.props.overlay ? <div className={styles.backgroundImageOverlay} style={{
          background: this.props.overlay,
        }} /> : null }
      </div>
    );
  }
};

export default BackgroundImage;
