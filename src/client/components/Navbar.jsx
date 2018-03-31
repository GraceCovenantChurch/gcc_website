import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Navbar.css';

/** Navbar component */
class Navbar extends Component {

  /** PropTypes */
  static get propTypes() {
    return {
      className: PropTypes.string,
      brand: PropTypes.element,
      links: PropTypes.arrayOf(PropTypes.element),
    };
  }

  /** Default props */
  static get defaultProps() {
    return {
      className: '',
      brand: null,
      links: [],
    };
  }

  /**
   * @constructor
   * @param {Object} props
   * @param {string} [props.className=''] - Inherited className
   * @param {ReactElement} [props.brand=null] - Element to use as navbar brand
   * @param {ReactElement[]} [props.links=[]] - List of navbar links
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     * @property {boolean} collapsed - Whether the navbar is open or closed
     * @property {boolean} collapsing - Whether the navbar is opening or closing
     * @property {boolean} in - true when the navbar is completely open
     * @property {string|number} height - The CSS height of the navbar drawer
     * @property {number} top - The CSS position of the navbar offset from the top of the page
     */
    this.state = {
      collapsed: true,
      collapsing: false,
      in: false,
      height: 'auto',
      top: -100,
    };

    /** @type {HTMLElement} */
    this.navLinkList = undefined;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  /** Toggles the state of the navbar */
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

  /**  Opens the navbar */
  open() {
    if (this.state.collapsed) {
      this.toggle();
    }
  }

  /** Closes the navbar */
  close() {
    if (!this.state.collapsed) {
      this.toggle();
    }
  }

  /** @return {ReactElement} */
  render() {
    return (
      <nav
        id={styles.mainNavbar}
        className={`navbar navbar-expand-lg ${(this.props.className || '')}`}
      >
        {this.props.brand && React.cloneElement(this.props.brand, {
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

export default Navbar;
