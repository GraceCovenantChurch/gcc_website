import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import customStyles from './Event.css';

const EventComponent = (props) => {
  const endDate = <Fragment>{props.endDate && <span>-</span>} {props.endDate}</Fragment>;
  return (
    <div className={customStyles.card}>
      <div className={customStyles.tag}>{props.tag}</div>
      <div className={customStyles.date}>{props.startDate} {endDate}</div>
      <div className={customStyles.title}>{props.title}</div>
      <div className={customStyles.content}>{props.content}</div>
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
