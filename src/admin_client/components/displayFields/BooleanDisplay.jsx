import React, {Component} from 'react';

class BooleanDisplay extends Component {
  render() {
    return this.props.value ? <i className="fa fa-check" aria-hidden="true"></i> : null;
  }
};

export default BooleanDisplay;
