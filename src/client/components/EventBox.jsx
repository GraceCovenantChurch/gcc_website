import React from 'react';
import PropTypes from 'prop-types';
import Center from './Center';

import styles from './EventBox.css';

const EventBox = props => (
  <div className={styles.eventBox}>
    <Center vertical horizontal>
      <div className={styles.eventName}>{props.eventName}</div>
      <div className={styles.eventDate}>{props.eventDate}</div>
    </Center>
  </div>
);

EventBox.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
};

export default EventBox;
