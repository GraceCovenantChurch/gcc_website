import React, { Component } from 'react';
import classnames from 'classnames';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';
import { SparkScroll } from '../modules/spark.js';


const styles = (typeof CSS !== 'undefined') && require ('./TitleBanner.css');

class BannerBibleVerse extends Component {
  render() {
    return (
      <Jumbotron
        className="bibleVerse"
        style={{ height: '100vh' }}>
        <SparkScroll
          className="title"
          style={{ color: 'black' }}
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

export default BannerBibleVerse;
