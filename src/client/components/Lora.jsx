import React from 'react';
import PropTypes from 'prop-types';

import styles from './Lora.css';

const Lora = props => <p className={`${styles.lora}`}>{ props.children }</p>;

Lora.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Lora;
