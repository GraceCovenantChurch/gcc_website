import React, { Component } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';

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
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Events.bundle.css" />
        </Helmet>

        <div>
          <TitleBanner src="/static/images/events/events_background.jpg">
            Events
          </TitleBanner>

          <div className={styles.pageContent}>
            <TileDeck
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
