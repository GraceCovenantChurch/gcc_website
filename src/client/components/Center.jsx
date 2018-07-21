import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import customStyles from './Center.css';

const Center = props => (
  <div className={classnames(customStyles.center, {
      [customStyles.centerVertical]: props.vertical,
      [customStyles.centerHorizontal]: props.horizontal,
    })}
  >
    <div className={customStyles.centered}>
      {props.children}
    </div>
  </div>
);

Center.propTypes = {
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  children: PropTypes.node,
};

Center.defaultProps = {
  vertical: false,
  horizontal: false,
  children: null,
};

export default Center;
