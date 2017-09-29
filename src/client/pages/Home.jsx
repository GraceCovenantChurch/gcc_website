import React, {Component} from 'react';
import withTitle from '../hoc/withTitle';

class Home extends Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
};

export default withTitle()(Home);
