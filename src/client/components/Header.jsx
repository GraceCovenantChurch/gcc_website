import React, {Component} from 'react';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./Header.css');

class Header extends Component {
  render() {
    return (
      <div class="headerContainer">
      	<h1 class="headerText">{this.props.text}</h1>
      	<img class="headerImg" src={this.props.image}/>
      </div>
    );
  }
};

export default Header;