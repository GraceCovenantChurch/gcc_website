import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import TileDeck from '../components/TileDeck';

import styles from './Multimedia.css';

class Multimedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multimediaList: [],
    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'multimediaLink',
    }).then((entries) => {
      const multimediaList = entries.items.map((item) => {
        const imageComponent = (
          <a href={item.fields.link}>
            <img
              className={styles.image}
              src={item.fields.image.fields.file.url}
              alt={item.fields.image.fields.title}
            />
          </a>
        );

        const contentComponent = (
          <a href={item.fields.link}><h4><strong>{item.fields.title}</strong></h4></a>
        );

        return {
          contentComponent,
          imageComponent,
        };
      });

      this.setState({
        multimediaList,
      });
    });
  }

  render() {
    return (
      <div id={styles.multimedia}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Multimedia.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/multimedia/multimedia.jpg">
          Multimedia
        </TitleBanner>

        <div className={styles.pageContent}>
          <TileDeck
            data={this.state.multimediaList}
          />
        </div>
      </div>
    );
  }
}

const MultimediaPage = withTitle('Multimedia')(Multimedia);

export default MultimediaPage;
