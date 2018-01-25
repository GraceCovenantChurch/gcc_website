import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {clearNotification, SUCCESS, INFO, WARNING, DANGER} from '../modules/notifications';

import styles from './Notifications.css';

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
    }
  }

  componentDidMount() {
    this.mountTimeout = setTimeout(() => {
      this.setState({
        in: true,
      });
    }, 0);

    this.autoCloseTimeout = setTimeout(this.handleClose.bind(this), 5000);
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
        { in: this.state.in }
      )}>
        <a className="close" onClick={this.handleClose.bind(this)}>&times;</a>
        {this.props.notification.message}
      </div>
    )
  }
};

class Notifications extends Component {
  render() {
    return (
      <div className={styles.notifications}>
        <div className="container">
          {Object.keys(this.props.notifications || {}).map(k => (
            <Notification key={k} notification={this.props.notifications[k]} clear={() => this.props.clearNotification(k)} />
          ))}
        </div>
      </div>
    );
  }
};

export default connect(state => {
  return {
    notifications: state.notifications,
  };
}, dispatch => {
  return {
    clearNotification(key) {
      return dispatch(clearNotification(key));
    },
  };
})(Notifications);
