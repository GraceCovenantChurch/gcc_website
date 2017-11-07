import React, { Component } from 'react';
import classnames from 'classnames';
import Center from '../../Center';
import Jumbotron from '../../Jumbotron';
import BackgroundImage from '../../BackgroundImage';
import { SparkScroll } from '../../../modules/spark.js';


const styles = (typeof CSS !== 'undefined') && require ('./TitleBanner.css');

class TitleBanner extends Component {
  render() {
    return (
      <Jumbotron style={{height: '100vh'}}>
        <BackgroundImage
          src={ this.props.src }
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="fixed"/>
          <Center horizontal vertical>
            <div className="titleContainer">
              <SparkScroll.h1
                className="titleText"
                style={{ color: 'white' }}>
                { this.props.display }
              </SparkScroll.h1>
            </div>
          </Center>
      </Jumbotron>
    );
  }
};

export default TitleBanner;
