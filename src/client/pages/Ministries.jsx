import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import TileDeck from '../components/TileDeck';
import Lora from '../components/Lora';

import styles from './Ministries.css';

class Ministries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ministriesList: [],
    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'ministry',
    }).then((entries) => {
      const ministriesList = entries.items.map((item) => {
        const imageComponent = (
          <img
            className={styles.image}
            src={item.fields.image.fields.file.url}
            alt={item.fields.image.fields.title}
          />
        );

        const contentComponent = (
          <div>
            <h4><strong>{item.fields.name}</strong></h4>
            <div className={styles.subtitle}><Lora>Coordinator(s): {item.fields.coordinator}</Lora></div>
            <div className={styles.subtitle}><Lora>Contact: {item.fields.contact}</Lora></div>
            <div className={styles.description}>{item.fields.description}</div>
          </div>
        );

        return {
          contentComponent,
          imageComponent,
        };
      });

      this.setState({
        ministriesList,
      });
    });
  }

  render() {
    return (
      <div id={styles.ministries}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Ministries.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/ministries/ministries.jpg">
          Ministries
        </TitleBanner>

        <div className={styles.pageContent}>
          <TileDeck
            light
            data={this.state.ministriesList}
          />
        </div>
      </div>
    );
  }
}

const MinistriesPage = withTitle('Ministries')(Ministries);

export default MinistriesPage;
