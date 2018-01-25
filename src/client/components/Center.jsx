import React, {Component} from 'react';
import classnames from 'classnames';
import styles from './Center.css';

class Center extends Component {
  render() {
    return (
      <div className={classnames(styles.center, {
        [styles.centerVertical]: this.props.vertical,
        [styles.centerHorizontal]: this.props.horizontal,
      })}>
        <div className={styles.centered}>
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default Center;
