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
    }).then((entries) => {
      const givingList = entries.items.map((item) => {
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
              <h4 className={styles.header}>By Paypal or Credit Card</h4>
              {'Donating via check or cash will save GCC transaction fees. Alternatively, if you have a PayPal account, sending money directly to paypal@gracecovenant.net via the “send money to friends and family” option in PayPal will also save us transaction fees. Those without a PayPal account can also donate via credit card below!'}
            </div>

            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_donations" />
              <input type="hidden" name="business" value="N9HN645KT8XFY" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>

            <div className={styles.description}>
              <h4 className={styles.header}>Please consider contributing to some of our specific needs.</h4>
              {'If you feel the heart to, you can choose the specific cause/person you’d like to donate to. Whether you’re donating in person, by mail, or sending directly through your PayPal account, please include a note (i.e. “for UC Ministry Center”). Thank you ❤️'}
            </div>

            <TileDeck
              light
              data={this.state.givingList}
            />
          </div>
        </div>
      </div>
    );
  }
}

const GivingPage = withTitle('Giving')(Giving);

export default GivingPage;
