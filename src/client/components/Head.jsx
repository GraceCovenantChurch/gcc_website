import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

class Head extends Component {
  render() {
    return (
      <Helmet>
        <title>{this.props.title}</title>
      </Helmet>
    );
  }
};

export default connect(state => {
  return {
    title: state.metadata.title,
  };
})(Head);
