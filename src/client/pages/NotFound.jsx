import React, {Component} from 'react';
import withTitle from '../hoc/withTitle';

class NotFound extends Component {
  render() {
    return (
      <div>Nothing here!</div>
    );
  }
};

export default withTitle('Error: Not Found')(NotFound);
