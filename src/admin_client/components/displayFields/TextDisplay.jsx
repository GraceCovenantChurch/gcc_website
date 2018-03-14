import PropTypes from 'prop-types';

const TextDisplay = props => props.value;

TextDisplay.propTypes = {
  value: PropTypes.string,
};

TextDisplay.defaultProps = {
  value: '',
};

export default TextDisplay;
