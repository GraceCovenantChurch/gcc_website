import React, { Component } from 'react';
import classnames from 'classnames';

class TableRow extends Component {
  render() {
    return (
      <div className="tableRow row">
        <div className="col-sm-4">
          <strong>{this.props.title}</strong>
          <br></br>
          {this.props.days}
        </div>
        <div className="col-sm-8">
          {this.props.description}
          <br></br>
          <br></br>
          <a href={this.props.signupLink}>Signup here!</a>
        </div>
      </div>
    );
  }
}

export default TableRow;
