import React from 'react';

import customStyles from './Jumbotron.css';

const Jumbotron = props => <div className={`jumbotron ${customStyles.jumbotron}`} {...props} />;

export default Jumbotron;
