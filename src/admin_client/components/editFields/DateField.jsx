import React from 'react';
import Field from './Field';
import DatePicker from 'react-datepicker';
import moment from 'moment';
(typeof CSS !== 'undefined') && require('react-datepicker/dist/react-datepicker.css');
(typeof CSS !== 'undefined') && require('./DateField.css');

class DateField extends Field {
  render() {
    return (
      <DatePicker className="form-control"
        placeholder="Enter a date"
        selected={this.props.value && moment(this.props.value)}
        onChange={date => {
          this.props.valueChanged(date)
        }} />
    );
  }
};

export default DateField;
