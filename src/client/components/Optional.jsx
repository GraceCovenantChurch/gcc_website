import PropTypes from 'prop-types';

const Optional = (props) => {
  const shouldRender = (props.test instanceof Function) ? props.test() : !!props.test;
  return shouldRender ? props.children : null;
};

Optional.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  test: PropTypes.any,
  children: PropTypes.node,
};

Optional.defaultProps = {
  test: false,
  children: null,
};

export default Optional;
