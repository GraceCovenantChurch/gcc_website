import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Center.css';

const Center = props => (
  <div className={classnames(styles.center, {
      [styles.centerVertical]: props.vertical,
      [styles.centerHorizontal]: props.horizontal,
    })}
  >
    <div className={styles.centered}>
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
