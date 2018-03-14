import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Navbar.css';

/** Navbar component */
class Navbar extends Component {
  /** Scroll threshold: 500 */
  static get scrollThreshold() {
    return 800;
  }

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
     * @property {boolean} colllasing - Whether the navbar is opening or closing
     * @property {boolean} in - true when the navbar is completely open
     * @property {string|number} height - The CSS height of the navbar drawer
     * @property {boolean} atTop - true when the scroll position is at the top
     * @property {boolean} hidden - true when the navbar is hidden above the page
     * @property {boolean} hiding - true when the navbar hidden state is animating
     * @property {number} top - The CSS position of the navbar offset from the top of the page
     */
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

    /** @type {HTMLElement} */
    this.navLinkList = undefined;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  /** Binds the {@link Navbar.handleScroll} handler */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  /** Unbinds the {@link Navbar.handleScroll} handler */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  /**
   * Updates the state of the navbar based on scroll position.
   * Becomes visible when scrolling past {@link Navbar.scrollThreshold}
   * @listens {ScrollEvent}
   */
  handleScroll() {
    this.setState({
      atTop: window.scrollY < 200,
    });

    const hidden = this.state.hidden;
    const shouldHide = window.scrollY < Navbar.scrollThreshold;
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

  /** @return {ReactElement} */
  render() {
    return (
      <nav
        id={styles.mainNavbar}
        className={classnames(`navbar navbar-expand-lg ${(this.props.className || '')}`, {
          [styles.popup]: !this.state.atTop && !this.state.hidden,
        })}
        style={{ top: this.state.atTop ? '0px' : this.state.top }}
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
