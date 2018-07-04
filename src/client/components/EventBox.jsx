import React from 'react';
import PropTypes from 'prop-types';
import Center from './Center';

import styles from './EventBox.css';

const EventBox = props => (
  <div className={styles.eventBox}>
      <div className={styles.eventName}>{props.eventName}</div>
      <div className={styles.eventDate}>{props.eventDate}</div>
  </div>
);

EventBox.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
};

export default EventBox;
