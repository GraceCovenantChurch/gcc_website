import React, {Component} from 'react';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./Jumbotron.css');

class Jumbotron extends Component {
  render() {
    return (
      <div className={classnames('jumbotron')} {...this.props}>
        {this.props.children}
      </div>
    );
  }
};

export default Jumbotron;