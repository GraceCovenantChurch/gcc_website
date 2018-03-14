import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withTitle from '../../client/hoc/withTitle';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: true,
    };
    this.closeHandler = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      if (nextProps.open) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.props.setTitle();
    }
  }

  handleClose() {
    if (!this.props.confirmClose || this.props.confirmClose()) {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.close();
    }
  }

  open() {
    this.setState({
      hidden: false,
    }, () => {
      process.nextTick(() => {
        this.setState({
          open: true,
        });
      });
    });
  }

  close() {
    this.setState({
      open: false,
    }, () => {
      setTimeout(() => {
        this.setState({
          hidden: true,
        });
      }, 300);
    });
  }

  render() {
    return (
      <div className={classnames({ 'modal-open': !this.state.hidden })}>
        <div
          className={classnames('modal fade', {
            show: this.state.open,
          })}
          style={{
            display: this.state.hidden ? 'none' : 'block',
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.props.title}</h4>
                <button type="button" className="close" onClick={this.closeHandler}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              { this.props.footer ?
                <div className="modal-footer">
                  {this.props.footer}
                </div>
              : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  setTitle: PropTypes.func.isRequired,
  confirmClose: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
  footer: PropTypes.node,
};

Modal.defaultProps = {
  open: false,
  title: '',
  confirmClose: undefined,
  onClose: undefined,
  children: null,
  footer: null,
};

export default withTitle(ownProps => ownProps.title)(Modal);
