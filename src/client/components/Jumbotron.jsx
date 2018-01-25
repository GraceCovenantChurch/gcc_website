import React, {Component} from 'react';
import classnames from 'classnames';

import styles from './Jumbotron.css';

class Jumbotron extends Component {
  render() {
    return (
      <div className={`jumbotron ${styles.jumbotron}`} {...this.props}>
        {this.props.children}
      </div>
    );
  }
};

export default Jumbotron;
