import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

const Head = props => (
  <Helmet>
    <title>{props.title}</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" rel="stylesheet" />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: 'Grace Covenant Church',
};

export default connect(state => (
  {
    title: state.metadata.title,
  }
))(Head);
