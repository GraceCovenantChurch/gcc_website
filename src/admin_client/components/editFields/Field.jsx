import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Field extends Component { };

Field.propTypes = {
  value: PropTypes.any.isRequired,
  valueChanged: PropTypes.func.isRequired,
};

export default Field;
