import React, {Component} from 'react';
import moment from 'moment';

class DateDisplay extends Component {
  render() {
    return moment(this.props.value).format('ll');
  }
};

export default DateDisplay;
