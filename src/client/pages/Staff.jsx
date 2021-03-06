import React, { Component } from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TileDeck from '../components/TileDeck';
import TitleBanner from '../components/TitleBanner';
import Lora from '../components/Lora';
import contentfulClient from '../modules/contentful';

import styles from './Staff.css';

const INITIAL_STATE = {
  staffList: [],
};

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'staff',
      order: 'fields.id',
    }).then((entries) => {
      const staffList = entries.items.map((item) => {
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
            <div className={styles.subtitle}>
              <Lora>{item.fields.title}</Lora>
            </div>
            <a className={styles.email} href={`mailto:${item.fields.email}`}>
              <Lora>{item.fields.email}</Lora>
            </a>
            <div className={styles.description}>{item.fields.biography}</div>
          </div>
        );

        return {
          contentComponent,
          imageComponent,
        };
      });

      this.setState({
        staffList,
      });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Staff.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/staff/staff.jpg">
          Staff
        </TitleBanner>

        <div className={styles.pageContent}>
          <TileDeck
            data={this.state.staffList}
          />
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
