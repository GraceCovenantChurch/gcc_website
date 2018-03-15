import React from 'react';
import PropTypes from 'prop-types';

/**
 * Checkbox for display a boolean value
 * @param {Object} props
 * @param {boolean} [props.value=false] The boolean value
 * @return {ReactElement}
 */
const BooleanDisplay = props => (props.value ? <i className="fa fa-check" aria-hidden="true" /> : null);

BooleanDisplay.propTypes = {
  value: PropTypes.bool,
};

BooleanDisplay.defaultProps = {
  value: false,
};

export default BooleanDisplay;
