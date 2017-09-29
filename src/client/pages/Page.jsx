import React, {Component} from 'react';
import withTitle from '../hoc/withTitle';

class Page extends Component {
  render() {
    return (
      <div>Other page</div>
    );
  }
};

export default withTitle('Page')(Page);
