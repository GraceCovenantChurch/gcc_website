import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      collapsing: false,
      in: false,
      height: 'auto',
      atTop: true,
      hidden: true,
      hiding: false,
      top: -100,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.scollCallback = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scollCallback);
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scollCallback);
  }

  toggle() {
    if (this.state.collapsing) {
      return;
    }

    const collapsed = this.state.collapsed;
    this.setState({
      collapsed: !collapsed,
      collapsing: true,
      height: collapsed ? 0 : this.navLinkList.clientHeight,
    }, () => {
      setTimeout(() => {
        this.setState({
          height: collapsed ? this.navLinkList.clientHeight : 0,
        }, () => {
          setTimeout(() => {
            this.setState({
              collapsing: false,
              height: 'auto',
              in: collapsed ? true : undefined,
            });
          }, 300);
        });
      }, 10);
    });
  }

  open() {
    if (this.state.collapsed) {
      this.toggle();
    }
  }

  close() {
    if (!this.state.collapsed) {
      this.toggle();
    }
  }

  handleScroll() {
    this.setState({
      atTop: window.scrollY < 200,
    });

    const hidden = this.state.hidden;
    const shouldHide = window.scrollY < 800;
    if (hidden !== shouldHide && !this.state.hiding) {
      if (!shouldHide) {
        this.setState({
          hiding: true,
          hidden: false,
          top: -100,
        }, () => {
          setTimeout(() => {
            this.setState({
              top: 0,
            }, () => {
              this.setState({
                hiding: false,
              });
            });
          }, 100);
        });
      } else {
        this.setState({
          hiding: true,
          top: 0,
        }, () => {
          setTimeout(() => {
            this.setState({
              top: -100,
            }, () => {
              setTimeout(() => {
                this.setState({
                  hiding: false,
                  hidden: true,
                });
              }, 300);
            });
          }, 100);
        });
      }
    }
  }

  render() {
    return (
      <nav
        id={styles.mainNavbar}
        className={classnames(`navbar navbar-expand-lg ${(this.props.className || '')}`, {
          [styles.popup]: !this.state.atTop && !this.state.hidden,
        })}
        style={{ top: this.state.atTop ? '0px' : this.state.top }}
      >
        {React.cloneElement(this.props.brand, {
          className: `navbar-brand ${styles['navbar-brand']}`,
          onClick: this._close,
        })}
        <button className={`navbar-toggler ${styles['navbar-toggler']}`} type="button" onClick={this.toggle}>
          <span className={`navbar-toggler-icon ${styles['navbar-toggler-icon']}`} />
        </button>

        <div
          className={classnames('navbar-collapse', {
            show: this.state.in,
            collapsing: this.state.collapsing,
            collapse: !this.state.collapsing,
          })}
          style={{ height: this.state.height }}
        >
          <ul className={`navbar-nav ml-auto ${styles['navbar-nav']}`} ref={(el) => { this.navLinkList = el; }}>
            {React.Children.map(this.props.links, link => (
              <li className="nav-item">
                {React.cloneElement(link, {
                  onClick: this.close,
                  className: `nav-link ${styles['nav-link']}`,
                })}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  className: PropTypes.string,
  brand: PropTypes.element,
  links: PropTypes.arrayOf(PropTypes.element),
};

Navbar.defaultProps = {
  className: '',
  brand: null,
  links: [],
};

export default Navbar;
