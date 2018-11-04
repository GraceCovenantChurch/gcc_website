import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import TileDeck from '../components/TileDeck';
import Lora from '../components/Lora';
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
      const beliefsList = entries.items.map((item) => {
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
            <div className={styles.description}>{item.fields.description}</div>
          </div>
        );

        return {
          contentComponent,
          imageComponent,
        };
      });

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
          <TitleBanner src="/static/images/beliefs/beliefs_background.jpg">
            Beliefs
          </TitleBanner>

          <div className={styles.beliefsContent}>
            <div className={styles.section}>
              <h4 className={styles.subtitle}>Our Vision</h4>
              <div className={styles.description}>
                <Lora>To raise up kingdom workers who are transformed by Christ to influence the world.</Lora>
              </div>
            </div>

            <div className={styles.section}>
              <h4 className={styles.subtitle}>Five Core Values</h4>
              <ul className={styles.list}>
                <li><Lora>Bible Based</Lora></li>
                <li><Lora>Prayer Driven</Lora></li>
                <li><Lora>Spirit Led</Lora></li>
                <li><Lora>Community Centered</Lora></li>
                <li><Lora>Missions Focused</Lora></li>
              </ul>
            </div>

            <div className={styles.section}>
              <div className={styles.description}>
                <TileDeck
                  light
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
