import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { clearNotification, SUCCESS, INFO, WARNING, DANGER } from '../modules/notifications';

import customStyles from './Notifications.css';

function alertClass(status) {
  switch (status) {
    case SUCCESS:
      return 'alert-success';
    case WARNING:
      return 'alert-warning';
    case DANGER:
      return 'alert-danger';
    case INFO:
    default:
      return 'alert-info';
  }
}

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false,
    };
    this.closeHandler = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.mountTimeout = setTimeout(() => {
      this.setState({
        in: true,
      });
    }, 0);

    this.autoCloseTimeout = setTimeout(this.closeHandler, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.mountTimeout);
    clearTimeout(this.autoCloseTimeout);
  }

  handleClose() {
    clearTimeout(this.autoCloseTimeout);
    this.setState({
      in: false,
    }, () => {
      setTimeout(this.props.clear, 300);
    });
  }

  render() {
    return (
      <div className={classnames(
        'alert fade alert-dismissable',
        alertClass(this.props.notification.status),
        { show: this.state.in },
      )}>
        <button className="close" onClick={this.closeHandler}>&times;</button>
        {this.props.notification.message}
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    status: PropTypes.oneOf([SUCCESS, INFO, WARNING, DANGER]),
    message: PropTypes.string,
  }).isRequired,
};

const Notifications = props => (
  <div className={customStyles.notifications}>
    <div className="container">
      {Object.keys(props.notifications).map(k => (
        <Notification
          key={k}
          notification={props.notifications[k]}
          clear={() => props.clearNotification(k)}
        />
      ))}
    </div>
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.objectOf(Notification.propTypes.notification).isRequired,
};

export default connect(state => (
  {
    notifications: state.notifications || {},
  }
), dispatch => (
  {
    clearNotification(key) {
      return dispatch(clearNotification(key));
    },
  }
))(Notifications);
