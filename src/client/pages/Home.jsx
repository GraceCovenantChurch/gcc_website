/* eslint react/no-unescaped-entities: 0 */
import moment from 'moment';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import contentfulClient from '../modules/contentful';
import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Jumbotron from '../components/Jumbotron';
import Banner from '../components/Banner';
import TileDeck from '../components/TileDeck';

import styles from './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
    };
  }

  componentDidMount() {
    const yesterday = moment().subtract(1, 'days').toISOString();
    contentfulClient.getEntries({
      content_type: 'event',
      'fields.date[gte]': yesterday,
      limit: 3,
      order: 'fields.date',
    }).then((entries) => {
      const eventsList = entries.items.map((item) => {
        const imageComponent = (
          <img
            className={styles.image}
            src={item.fields.image.fields.file.url}
            alt={item.fields.image.fields.title}
          />
        );

        const contentComponent = (
          <div>
            <h4><strong>{item.fields.title}</strong></h4>
            <div className={styles.subtitle}>{moment(item.fields.date).calendar()}</div>
            <div className={styles.subtitle}>{item.fields.location}</div>
            <div className={styles.description}>{item.fields.description}</div>
            <a className={styles.link} href={item.fields.link}>Go to event page ></a>
          </div>
        );

        return {
          imageComponent,
          contentComponent,
        };
      });

      this.setState({
        eventsList,
      });
    });
  }

  render() {
    const titleSection = (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src="/static/images/home/worship.jpg"
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="local"
        />
        <div className={styles.titleSection}>
          <div className={styles.titleSectionMission}>
            Raising up kingdom workers <br />
            who are transformed by Christ <br />
            to influence the world.
          </div>
          <a className={styles.titleSectionLink} href="/welcome">Learn more ></a>
        </div>
      </Jumbotron>
    );

    const infoSection = (
      <div className={styles.infoSection}>
        <div className={styles.infoSectionHeader}>
          Service Locations and Times
        </div>
        <div className={styles.infoSectionTimes}>
          Sunday Service: 11:30 AM
        </div>
        <div className={styles.infoSectionLocation}>
          Meyerson Hall B1 <br />
          210 South 34th Street <br />
          Philadelphia, PA 19104
        </div>
        <div className={styles.infoSectionTimes}>
          College Friday Night Live: 07:30 PM
        </div>
        <div className={styles.infoSectionLocation}>
          Meyerson Hall B1
        </div>
        <div className={styles.infoSectionTimes}>
          Young Adult Friday Night Live: 07:00 PM
        </div>
        <div className={styles.infoSectionLocation}>
          Ralston House <br />
          3615 Chestnut Street <br />
          Philadelphia, PA 19104 <br />
        </div>
        <a className={styles.infoSectionLink} href="/welcome">Learn more ></a>
      </div>
    );

    const familyGroupSection = (
      <Banner src="/static/images/home/familygroup.jpg">
        <div className={styles.fgSection}>
          <div className={styles.titleSectionSubtitle}>
            Community
          </div>
          <div className={styles.fgSectionHeader}>
            Family Group
          </div>
          <div className={styles.fgSectionSubtitle}>
            You haven't checked out GCC unless <br />
            you've checked out our family groups.
          </div>
          <a className={styles.fgSectionLink} href="/familygroup">Sign up here ></a>
        </div>
      </Banner>
    );

    const amiSection = (
      <Banner src="/static/images/home/amiqt.jpg" centered>
        <div className={styles.centeredSection}>
          <div className={styles.title}>
            AMI Quiet Times
          </div>
          <div className={styles.subtitle}>
            Mobile apps for iOS and Android are also available.
          </div>

          <div className={styles.download}>
            <a href="https://itunes.apple.com/us/app/id651172729?mt=8&uo=4" target="_blank">
              <img className={styles.downloadButton} src="/static/icon/apple_download.svg"/>
            </a>
            <a href="https://amiquiettimes.com" target="_blank">
              <img className={styles.downloadButton} src="/static/icon/ami.png"/>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.ami&referrer=utm_source%3Dsubsplash%26utm_content%3DeyJoYW5kbGVyIjoiYXBwIiwiYXBwa2V5IjoiNlZaSFZOIn0=" target="_blank">
              <img className={styles.downloadButton} src="/static/icon/google_download.png"/>
            </a>
          </div>
        </div>
      </Banner>
    );

    const memoryVerseSection = (
      <div className={styles.emptySection}>
        <div className={styles.title}>Monthly Memory Verse</div>
        <div className={styles.memoryVerse}>He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the LORD, “My refuge and my fortress, my God, in whom I trust.”</div>
        <div className={styles.footerText}>Psalm 91:1-2</div>
      </div>
    );

    let events = null;

    if (this.state.eventsList.length !== 0) {
      events = (
        <TileDeck
          data={this.state.eventsList}
        />
      );
    } else {
      events = (
        <div className={styles.eventSectionEventsError}>
          There seems to be no upcoming events
        </div>
      );
    }

    const eventSection = (
      <div className={styles.eventSection}>
        <div className={styles.eventSectionSubtitle}>Upcoming Events</div>
        <div className={styles.eventsContainer}>{events}</div>
        <a className={styles.eventSectionSubtitle} href="/events">See all events ></a>
      </div>
    );

    return (
      <div id="home" className={styles.home}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>
        {titleSection}
        {infoSection}
        {familyGroupSection}
        {eventSection}
        {amiSection}
        {memoryVerseSection}
      </div>
    );
  }
}

const HomePage = compose(
  withTitle(),
  withRouter,
)(Home);

export default HomePage;
