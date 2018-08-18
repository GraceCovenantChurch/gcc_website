import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import TileDeck from '../components/TileDeck';

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
      const ministriesList = entries.items.map(item => ({
        title: item.fields.name,
        subtitle: `Coordinator: ${item.fields.coordinator}\nContact: ${item.fields.contact}`,
        description: item.fields.description,
        image: item.fields.image.fields.file.url,
        imageTitle: item.fields.image.fields.title,
      }));

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
            data={this.state.ministriesList}
          />
        </div>
      </div>
    );
  }
}

const MinistriesPage = withTitle('Ministries')(Ministries);

export default MinistriesPage;
