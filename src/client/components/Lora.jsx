import React from 'react';
import PropTypes from 'prop-types';

import styles from './Lora.css';

const Lora = props => <a className={`${styles.lora}`}>{ props.children }</a>;

Lora.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lora;
