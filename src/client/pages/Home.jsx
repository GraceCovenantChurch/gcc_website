import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pluralize from 'pluralize';

import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Jumbotron from '../components/Jumbotron';
import Banner from '../components/Banner';
import EventBox from '../components/EventBox';
import { fetchModelData } from '../modules/modelData';

import customStyles from './Home.css';

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
        <div className={customStyles.titleSection}>
          <div className={customStyles.titleSectionSubtitle}>
            Our Vision
          </div>
          <div className={customStyles.titleSectionMission}>
              Raising up kingdom workers <br />
              who are transformed by Christ <br />
              to change the world.
          </div>
          <a className={customStyles.titleSectionLink} href="/welcome">Learn More ></a>
        </div>
      </Jumbotron>
    );

    const infoSection = (
      <div className={customStyles.infoSection}>
        <div className={customStyles.infoSectionHeader}>
          Service Location and Times
        </div>
        <div className={customStyles.infoSectionTimes}>
            Sunday Service: 11:15 AM <br />
            Friday Night Live: 7:30 PM
        </div>
        <div className={customStyles.infoSectionLocation}>
          Meyerson Hall B-1, 210 South 34th Street <br />
          Philadelphia, PA 19104
        </div>
        <a className={customStyles.infoSectionLink} href="/welcome">Learn More ></a>
      </div>
    );

    const familyGroupSection = (
      <Banner src="/static/images/home/familygroup.jpg">
        <div className={customStyles.fgSection}>
          <div className={customStyles.titleSectionSubtitle}>
            Community
          </div>
          <div className={customStyles.fgSectionHeader}>
            Family Groups
          </div>
          <div className={customStyles.fgSectionSubtitle}>
              You haven't checked out GCC unless <br />
              you've checked out our family groups.
          </div>
          <a className={customStyles.fgSectionLink} href="/familygroup">Sign Up Here ></a>
        </div>
      </Banner>
    );


    let events = null;
    if (this.props.data.length !== 0) {
      events = (
        <div className={customStyles.eventSectionEvents}>
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
        <div className={customStyles.eventSectionEventsError}>
          There seems to be no upcoming events
        </div>
      );
    }

    const eventSection = (
      <div className={customStyles.eventSection}>
        <div className={customStyles.eventSectionSubtitle}>Upcoming Events</div>
        {events}
        <a className={customStyles.eventSectionSubtitle} href="/events">See All Events ></a>
      </div>
    );

    return (
      <div id="home">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>
        {titleSection}
        {infoSection}
        {familyGroupSection}
        {eventSection}
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
