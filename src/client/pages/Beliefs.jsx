import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import TileDeck from '../components/TileDeck';
import contentfulClient from '../modules/contentful';
import styles from './Beliefs.css';


class Beliefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beliefsList: [],
    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'belief',
    }).then((entries) => {
      const beliefsList = entries.items.map(item => ({
        title: item.fields.name,
        description: item.fields.description,
        image: item.fields.image.fields.file.url,
        imageTitle: item.fields.image.fields.title,
      }));

      this.setState({
        beliefsList,
      });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Beliefs.bundle.css" />
        </Helmet>

        <div className={styles.beliefs}>
          <TitleBanner src="/static/images/beliefs/beliefs.jpg">
            Beliefs
          </TitleBanner>

          <div className={styles.beliefsContent}>
            <div className={styles.section}>
              <div className={styles.subtitle}>Our Vision</div>
              <div className={styles.description}>To raise up kingdom workers who are transformed by Christ to influence the world.</div>
            </div>

            <div className={styles.section}>
              <div className={styles.subtitle}>Five Core Values</div>
              <ul className={styles.list}>
                <li>Bible Based</li>
                <li>Prayer Driven</li>
                <li>Spirit Led</li>
                <li>Community Centered</li>
                <li>Missions Focused</li>
              </ul>
            </div>

            <div className={styles.section}>
              <div className={styles.subtitle}>Beliefs</div>
              <div className={styles.description}>
                <TileDeck
                  data={this.state.beliefsList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const BeliefsPage = withTitle('Beliefs')(Beliefs);

export default BeliefsPage;
