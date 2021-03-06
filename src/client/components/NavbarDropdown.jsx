import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavbarDropdown.css';

const NavbarDropdown = props => (
  <div className={`nav-link ${styles.dropdown}`}>
    <button className={styles.dropdownButton}>
      { props.text }
    </button>
    <div className={`nav-link ${styles.dropdownContent}`}>
      { props.children }
    </div>
  </div>
);

NavbarDropdown.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavbarDropdown;
