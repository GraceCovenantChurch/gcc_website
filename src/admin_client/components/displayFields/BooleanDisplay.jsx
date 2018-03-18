import React from 'react';
import PropTypes from 'prop-types';

const BooleanDisplay = props => (props.value ? <i className="fa fa-check" aria-hidden="true" /> : null);

BooleanDisplay.propTypes = {
  value: PropTypes.bool,
};

BooleanDisplay.defaultProps = {
  value: false,
};

export default BooleanDisplay;
