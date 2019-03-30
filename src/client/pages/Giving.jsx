import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import TileDeck from '../components/TileDeck';
import Lora from '../components/Lora';

import styles from './Giving.css';

class Giving extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givingList: [],

    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'giving',
      order: 'fields.name',
    }).then((entries) => {
      const givingList = entries.items.map((item) => {
        const itemName = item.fields.name;
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
            <div className={styles.subtitle}><Lora>{item.fields.subtitle}</Lora></div>
            <div className={styles.description}>{item.fields.description}</div>
            {item.fields.link &&
              (
                <a className={styles.link} href={item.fields.link}>
                  <Lora>Learn More ></Lora>
                </a>
               )
            }
          </div>
        );

        return {
          itemName,
          contentComponent,
          imageComponent,
        };
      });

      this.setState({
        givingList,
      });
    });
  }

  render() {
    const { givingList } = this.state;

    return (
      <div id={styles.Giving}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Giving.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/giving/giving_header.jpg">
          Giving
        </TitleBanner>

        <div className={styles.pageContent}>
          <div className={styles.pageContent}>
            <div className={styles.description}>
              {'Welcome to GCC’s giving resource! We would love for you to partner with us in the work of raising up kingdom workers. Here are three ways in which you can contribute:'}
            </div>

            <div className={styles.description}>
              <h4 className={styles.header}>In Person</h4>
              {'During Sunday Service'}
            </div>

            <div className={styles.description}>
              <h4 className={styles.header}>By Mail</h4>
              {'3700 Baring Street'}<br />
              {'Philadelphia, PA 19104'}
            </div>

            <div className={styles.description}>
              <h4 className={styles.header}>Online</h4>
              {'Donating via check or cash will save GCC transaction fees. Alternatively, if you would like to give online, please use the module below. If it is your first time giving online, you will need to set up an account.'}
            </div>

            <div className={styles.donations}>
              <iframe title="donate" src="https://wallet.subsplash.com/ui/embed/QZRM2D/" width="100%" height="630" style={{ border: 'none', overflow: 'hidden' }} frameBorder="0" scrolling="no" />
            </div>

            <div className={styles.description}>
              <h4 className={styles.header}>Please consider contributing to some of our specific needs.</h4>
              {'If you feel the heart to, you can choose the specific cause/person you’d like to donate to. Whether you’re donating in person, by mail, or online, please include a note (i.e. “for UC Ministry Center”). Thank you ❤️'}
            </div>

            <TileDeck
              light
              data={givingList}
            />
          </div>
        </div>
      </div>
    );
  }
}

const GivingPage = withTitle('Giving')(Giving);

export default GivingPage;
