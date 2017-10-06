import React, {Component} from 'react';
import classnames from 'classnames';
import withTitle from '../../client/hoc/withTitle';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: true,
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.title != prevProps.title) {
      this.props.setTitle();
    }
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
      <div className={classnames({'modal-open': !this.state.hidden})}>
        <div className={classnames('modal fade', {in: this.state.open})} style={{display: this.state.hidden ? 'none' : 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.handleClose.bind(this)}><span>&times;</span></button>
                <h4 className="modal-title">{this.props.title}</h4>
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
};

export default withTitle(ownProps => ownProps.title)(Modal);
