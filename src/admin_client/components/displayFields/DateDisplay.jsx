import PropTypes from 'prop-types';
import moment from 'moment';

const DateDisplay = props => moment(props.value).format('ll');

DateDisplay.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
};

DateDisplay.defaultProps = {
  value: '',
};

export default DateDisplay;
