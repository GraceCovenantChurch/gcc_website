import React, { Component } from 'react';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';
import { SparkScroll } from '../modules/spark.js';


const styles = (typeof CSS !== 'undefined') && require ('./TitleBanner.css');

class Banner extends Component {
  render() {
    return (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src={ this.props.src }
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="fixed" />
        <SparkScroll
          className="title"
          style={{ color: 'white', top: this.props.topMargin + "%"}}
          timeline={{
            centerCenter: { opacity: 1 },
            topTop: { opacity: 0 }
          }}>
          { this.props.children }
        </SparkScroll>
      </Jumbotron>
    );
  }
};

export default Banner;
