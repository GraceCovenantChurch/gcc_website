import React from 'react';
import PropTypes from 'prop-types';

import customStyles from './EventBox.css';

const EventBox = props => (
  <div className={customStyles.eventBox}>
    <div className={customStyles.eventName}>{props.eventName}</div>
    <div className={customStyles.eventDate}>{props.eventDate}</div>
  </div>
);

EventBox.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
};

export default EventBox;
