import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../modules/metadata';

export default function withTitle(title) {
  return function (WrappedComponent) {
    class TitleWrapper extends Component {
      static fetchData({ dispatch }) {
        return dispatch(setTitle(title));
      }

      componentWillMount() {
        this.props.setTitle();
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return connect(undefined, (dispatch, ownProps) => ({
      setTitle() {
        if (typeof title === 'function') {
          dispatch(setTitle(title(ownProps)));
        } else {
          dispatch(setTitle(title));
        }
      },
    }))(TitleWrapper);
  };
}
