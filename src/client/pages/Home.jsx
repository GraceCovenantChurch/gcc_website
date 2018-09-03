/* eslint react/no-unescaped-entities: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pluralize from 'pluralize';

import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';
import Jumbotron from '../components/Jumbotron';
import Banner from '../components/Banner';
import EventBox from '../components/EventBox';
import { fetchModelData } from '../modules/modelData';

import styles from './Home.css';

class Home extends Component {
  componentDidMount() {
    this.props.fetchData();
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
              to change the world.
          </div>
          <a className={styles.titleSectionLink} href="/welcome">Learn More ></a>
        </div>
      </Jumbotron>
    );

    const infoSection = (
      <div className={styles.infoSection}>
        <div className={styles.infoSectionHeader}>
          Service Location and Times
        </div>
        <div className={styles.infoSectionTimes}>
            Sunday Service: 11:15 AM <br />
            Friday Night Live: 7:30 PM
        </div>
        <div className={styles.infoSectionLocation}>
          Meyerson Hall B1 <br />
          210 South 34th Street <br />
          Philadelphia, PA 19104
        </div>
        <a className={styles.infoSectionLink} href="/welcome">Learn More ></a>
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
          <a className={styles.fgSectionLink} href="/familygroup">Sign Up Here ></a>
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

    const eventSection = (
      <div className={styles.eventSection}>
        <div className={styles.eventSectionSubtitle}>Upcoming Events</div>
        {events}
        <a className={styles.eventSectionSubtitle} href="/events">See All Events ></a>
      </div>
    );

    let events = null;

    if (this.props.data.length !== 0) {
      events = (
        <div className={styles.eventSectionEvents}>
          {this.props.data.map(eventObj => (
            <EventBox
              eventName={eventObj.title}
              eventDate={new Date(eventObj.startDate).toLocaleDateString()}
              key={eventObj._id}
            />
          ))}
        </div>
      );
    } else {
      events = (
        <div className={styles.eventSectionEventsError}>
          There seems to be no upcoming events
        </div>
      );
    }

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

Home.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => {
  const modelData = state.modelData[pluralize('Event')];
  return {
    data: modelData ? modelData.ids.map(id => modelData.__DB__[id]) : [],
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData() {
    return dispatch(fetchModelData('Event'));
  },
});

const HomePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTitle(),
  withRouter,
)(Home);

export default HomePage;
