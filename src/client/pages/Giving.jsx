import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { Form, FormGroup, Label, Col, Input } from 'reactstrap';

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
              <h4 className={styles.header}>By PayPal or Credit Card</h4>
              {'Donating via check or cash will save GCC transaction fees. Alternatively, if you have a PayPal account, sending money directly to paypal@gracecovenant.net via the “send money to friends and family” option in PayPal will also save us transaction fees. Those without a PayPal account can also donate via credit card below!'}
            </div>

            <div className={styles.donations}>
              <Form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <h5 className={styles.donationTitle}>Donation Form</h5>
                <input type="hidden" name="cmd" value="_donations" />
                <input type="hidden" name="business" value="paypal@gracecovenant.net" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="tax" value="0" />
                <input type="hidden" name="lc" value="US" />
                <FormGroup row>
                  <Label className={styles.label} for="item_name" sm={2}>Donation Options</Label>
                  <Col sm={10}>
                    <Input type="select" name="item_name" id="item_name">
                      <option>General Giving</option>
                      { givingList.map(item => (
                        <option>{item.itemName}</option>
                        ))
                      }
                    </Input>
                  </Col>
                </FormGroup>
                <input className={styles.button} type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img className={styles.button} alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </Form>
            </div>

            <div className={styles.description}>
              <h4 className={styles.header}>Please consider contributing to some of our specific needs.</h4>
              {'If you feel the heart to, you can choose the specific cause/person you’d like to donate to. Whether you’re donating in person, by mail, or sending directly through your PayPal account, please include a note (i.e. “for UC Ministry Center”). Thank you ❤️'}
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
