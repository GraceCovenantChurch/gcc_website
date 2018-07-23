import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Event.css';

const EventComponent = (props) => {
  const endDate = <Fragment>{props.endDate && <span>-</span>} {props.endDate}</Fragment>;
  return (
    <div className={styles.card}>
      <div className={styles.tag}>{props.tag}</div>
      <div className={styles.date}>{props.startDate} {endDate}</div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.content}>{props.content}</div>
    </div>
  );
};

EventComponent.propTypes = {
  tag: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

EventComponent.defaultProps = {
  tag: '',
  endDate: '',
  content: '',
};

export default EventComponent;
