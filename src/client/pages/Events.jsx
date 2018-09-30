import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import TileDeck from '../components/TileDeck';
import contentfulClient from '../modules/contentful';
import styles from './Events.css';


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'event',
    }).then((entries) => {
      const eventsList = entries.items.map(item => ({
        title: item.fields.title,
        description: item.fields.description,
        image: item.fields.image.fields.file.url,
        imageTitle: item.fields.image.fields.title,
        date: item.fields.date,
        link: item.fields.link,
        location: item.fields.location,
      }));
      this.setState({
        eventsList,
      });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Events.bundle.css" />
        </Helmet>

        <div>
          <TitleBanner src="/static/images/events/events_background.jpg">
            Events
          </TitleBanner>

          <div className={styles.eventsContent}>
            <TileDeck
              light
              data={this.state.eventsList}
            />
          </div>
        </div>
      </div>
    );
  }
}

const EventsPage = withTitle('Events')(Events);

export default EventsPage;
