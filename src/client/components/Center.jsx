import React, {Component} from 'react';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./Center.css');

class Center extends Component {
  render() {
    return (
      <div className={classnames('center', {
        'center-vertical': this.props.vertical,
        'center-horizontal': this.props.horizontal,
      })}>
        <div className="centered">
          {this.props.children}
        </div>
      </div>
    );
  }
};

export default Center;