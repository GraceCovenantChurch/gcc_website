import React from 'react';
import PropTypes from 'prop-types';

import generalStyles from './NavbarDropdown.css';
import navStyles from './Navbar.css'

console.log(generalStyles);

const NavbarDropdown = props => (
  <div className={ `nav-link ${generalStyles.dropdown}` }>
    <button className={ generalStyles.dropdownButton }>
      { props.text }
    </button>
    <div className={ `nav-link ${generalStyles.dropdownContent}` }>
      { props.children }
    </div>
  </div>
)

NavbarDropdown.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default NavbarDropdown;
