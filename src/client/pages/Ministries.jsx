import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import pluralize from 'pluralize';

import withTitle from '../hoc/withTitle';
import Center from '../components/Center';
import TitleBanner from '../components/TitleBanner';
import { fetchModelData } from '../modules/modelData';


import styles from './Ministries.css';

class Ministries extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const ministryList = this.props.data.map(ministryObj => ministryObj.name);

    return (
      <div id={styles.ministries}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Ministries.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/home/philly.jpg">
          <Center horizontal vertical>
            Ministries
          </Center>
        </TitleBanner>

        <div className={styles.pageContent}>
          {ministryList.map(ministryName => (
            <div className={styles.ministryBox} key={ministryName}>
              <Center vertical>{ministryName}</Center>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ministries.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

const withData = connect((state) => {
  const modelData = state.modelData[pluralize('Ministry')];
  return {
    data: modelData ? modelData.ids.map(id => modelData.__DB__[id]) : [],
  };
}, dispatch => (
  {
    fetchData() {
      return dispatch(fetchModelData('Ministry'));
    },
  }
));

const MinistriesPage = compose(withData, withTitle('Ministries'), withRouter)(Ministries);

export default MinistriesPage;
