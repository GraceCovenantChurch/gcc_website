import React, { Component } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import Lora from '../components/Lora';

import styles from './Sermons.css';

const INITIAL_STATE = {
  sermons: [],
};

class Sermons extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'sermon',
    }).then((entries) => {
      const sermons = entries.items.map(item => ({
        title: item.fields.title,
        date: moment(item.fields.date).format('MMMM DD YYYY'),
        passage: item.fields.passage,
        speaker: item.fields.speaker,
        url: item.fields.file.fields.file.url,
      }));

      this.setState({
        sermons,
      });
    });
  }

  render() {
    const sermonElements = this.state.sermons.map(sermon => (
      <div className={styles.sermon}>
        <div className={styles.title}>{sermon.title}</div>
        <div><Lora>{sermon.date}</Lora></div>
        <div>{sermon.speaker}</div>
        <div>{sermon.passage}</div>
        <div><a href={sermon.url}>Link to sermon</a></div>
      </div>
    ));

    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Sermons.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/multimedia/multimedia.jpg">
          Sermons (Coming Soon)
        </TitleBanner>

        <div className={styles.pageContent}>
          {sermonElements}
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Sermons')(Sermons);

export default StaffPage;
