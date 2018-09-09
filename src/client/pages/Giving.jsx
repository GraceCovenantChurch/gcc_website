import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';
import TileDeck from '../components/TileDeck';

import styles from './Giving.css';

const INITIAL_STATE = {

};

class Giving extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return (
      <div className={styles.giving}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Giving.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/giving/giving_background.jpg">
          Giving
        </TitleBanner>

        <div className={styles.givingContent}>
          <p className={styles.description}>
            Welcome to GCC’s giving resource! We would love for you to partner with us in the work of raising up kingdom workers. Here are three ways in which you can contribute:
          </p>

          <div className={styles.description}>
            <h3 className={styles.header}>In Person</h3>
            <p>During Sunday Service, you can give through our time of tithes and offering.</p>
          </div>

          <div className={styles.description}>
            <h3 className={styles.header}>By Mail</h3>
            <p>3700 Baring Street<br/>
            Philadelphia, PA 19104</p>
          </div>

          <div className={styles.description}>
            <h3 className={styles.header}>By Paypal or Credit Card</h3>
            <p>Donating via check or cash will save GCC transaction fees. Alternatively, if you have a PayPal account, sending money directly to paypal@gracecovenant.net via the "send money to friends and family" option in PayPal will also save GCC transaction fees. Those without a PayPal account, you can choose to donate through our forms below.</p>
            <div className={styles.payment}>
              <div className={styles.onetime}>
                <h4 className={styles.subheader}>One Time</h4>
                <p>Pay Here</p>
              </div>
              <div className={styles.repeated}>
                <h4 className={styles.subheader}>Recurring Donations</h4>
                <p>Pay Here</p>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.header}>Please consider contributing to some of our specific needs.</h3>
            <p>If you feel the heart to you can choose the specific cause/person you'd like to donate to through the dropdown form below. I fyou're donating in person, by mail, or sending directly through your PayPal account, please include a note (i.e. "for Singapore Church Plant"). Thank you!</p>
            <div className={styles.payment}>
              <p>Select Cause</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const GivingPage = withTitle('Giving')(Giving);

export default GivingPage;
