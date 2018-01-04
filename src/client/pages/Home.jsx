import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import {SparkScroll} from '../modules/spark.js';

import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';
import Jumbotron from '../components/Jumbotron';
import Event from '../components/Event';
import TitleBanner from '../components/TitleBanner';
import Banner from '../components/Banner';
import BannerBibleVerse from '../components/BannerBibleVerse';

import * as constVars from './data/vars-home.js';

const styles = (typeof CSS !== 'undefined') && require('./Home.css');

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>

        <Jumbotron style={{height: '100vh'}}>
          <BackgroundImage
            src="/static/images/home/philly.jpg"
            backgroundSize="cover"
            backgroundPosition="top left"
            backgroundAttachment="fixed"/>
          <SparkScroll
            className="title"
            style={{ color: 'white' }}
            timeline={{
              centerCenter: {opacity: 0},
              bottomBottom: {opacity: 1}
            }}>
              <h1>
                Grace Covenant Church
              </h1>
              <div className="subtitle">
                <h3>
                  Raising up Kingdom workers who are <br/>
                  influenced by Christ to change the world.
                </h3>
              </div>
          </SparkScroll>
        </Jumbotron>

        <Banner
          src="/static/images/home/familygroup.jpg">
          <h1>
            Join Us In Worship
          </h1>
          <div className="subtitle">
            <h3>
              Sunday Service 11:15AM <br/>
              Friday Night Live 7:30PM
            </h3>
            <h4>
              Meyerson Hall B-1, 210 South 34th Street <br/>
              Philadelphia, PA 19104
            </h4>
            <a href="/welcome">
              <button className="infoButton">More Info</button>
            </a>
          </div>
        </Banner>

        <BannerBibleVerse>

        </BannerBibleVerse>
      </div>
    );
  }
};

export default withTitle()(Home);
