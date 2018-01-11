import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import classnames from 'classnames';
import { PAGE_LOADED } from '../modules/page';
const styles = (typeof CSS !== 'undefined') && require('./Navbar.css');

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
  }

  componentWillMount() {
    this.scollCallback = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scollCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scollCallback);
  }

  componentDidMount() {
    this.handleScroll();
  }

  toggle() {
    if (this.state.collapsing) {
      return;
    }

    let collapsed = this.state.collapsed;
    this.setState({
      collapsed: !collapsed,
      collapsing: true,
      height: collapsed ? 0 : this.refs['navbar-nav'].clientHeight,
    }, () => {
      setTimeout(() => {
        this.setState({
          height: collapsed ? this.refs['navbar-nav'].clientHeight : 0,
        }, () => {
          setTimeout(() => {
            this.setState({
              collapsing: false,
              height: 'auto',
              in: collapsed ? true : undefined,
            })
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

  handleScroll(e) {
    this.setState({
      atTop: window.scrollY < 200,
    });

    let hidden = this.state.hidden;
    let shouldHide = window.scrollY < 800;
    if (hidden !== shouldHide && !this.state.hiding) {
      if (!shouldHide) {
        this.setState({
          hiding: true,
          hidden: false,
          top: -100,
        }, () => {
          setTimeout(() => {
            this.setState({
              top: 0
            }, () => {
              this.setState({
                hiding: false,
              });
            });
          }, 100)
        })
      } else {
        this.setState({
          hiding: true,
          top: 0,
        }, () => {
          setTimeout(() => {
            this.setState({
              top: -100
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
      <nav id="navbar" className={classnames(`navbar navbar-expand-lg ${(this.props.className || '')}`, {
        popup: !this.state.atTop && !this.state.hidden,
      })} style={{
        top: this.state.atTop ? '0px' : this.state.top,
      }}>
        {React.cloneElement(this.props.brand, {
          className: "navbar-brand",
          onClick: this.close.bind(this),
        })}
        <button className="navbar-toggler" type="button" onClick={this.toggle.bind(this)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={classnames('navbar-collapse', {
            show: this.state.in,
            collapsing: this.state.collapsing,
            collapse: !this.state.collapsing,
          })} style={{
            height: this.state.height,
          }}>
          <ul className="navbar-nav ml-auto" ref="navbar-nav">
            {React.Children.map(this.props.links, link => {
              return (
                <li className="nav-item">
                  {React.cloneElement(link, {
                    onClick: this.close.bind(this),
                    className: 'nav-link',
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
