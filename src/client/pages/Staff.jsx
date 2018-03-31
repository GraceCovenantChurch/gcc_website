import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';

import styles from './Staff.css';

class Staff extends Component {
  
  render() {

    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Staff.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/staff/staff_background.jpg">
          Staff
        </TitleBanner>

        <div className={styles.pageContent}>
          
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
