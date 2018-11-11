import React, { Component } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import TileDeck from '../components/TileDeck';
import Lora from '../components/Lora';
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
    const yesterday = moment().subtract(1, 'days').toISOString();
    contentfulClient.getEntries({
      content_type: 'event',
      'fields.date[gte]': yesterday,
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
            <div className={styles.subtitle}>
              <Lora>{moment(item.fields.date).calendar()}</Lora>
            </div>
            <div className={styles.subtitle}>
              <Lora>{item.fields.location}</Lora>
            </div>
            <div className={styles.description}>{item.fields.description}</div>
            {item.fields.link &&
              (
                <a className={styles.link} href={item.fields.link}>
                  <Lora>Go to event page ></Lora>
                </a>
               )
            }
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
