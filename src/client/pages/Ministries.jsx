import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import pluralize from 'pluralize';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import { fetchModelData } from '../modules/modelData';
import TileDeck from '../components/TileDeck';

import styles from './Ministries.css';

// TODO: update descriptions with proper text
const ministriesList = [
  {
    image: '/static/images/ministries/icons/diakonos.png',
    imageTitle: 'diakonos',
    title: 'Diakonos',
    description: 'We believe the Bible, both the Old and New Testaments, is the only inspired, infallible, and authoritative Word of God. It is the supreme source of truth for Christian faith and living.',
  },
  {
    image: '/static/images/ministries/icons/evangelism.png',
    imageTitle: 'evangelism',
    title: 'Evangelism',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/finance.png',
    imageTitle: 'finance',
    title: 'Finance',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/graphics.png',
    imageTitle: 'graphics',
    title: 'Graphics',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/hospitality.png',
    imageTitle: 'hospitality',
    title: 'Hospitality',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/missions.png',
    imageTitle: 'missions',
    title: 'Missions',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/multimedia.png',
    imageTitle: 'multimedia',
    title: 'Multimedia',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/overflow.png',
    imageTitle: 'overflow',
    title: 'Overflow',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/transportation.png',
    imageTitle: 'transportation',
    title: 'Transportation',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/web.png',
    imageTitle: 'web',
    title: 'Web',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/welcoming.png',
    imageTitle: 'welcoming',
    title: 'Welcoming',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
  {
    image: '/static/images/ministries/icons/worship.png',
    imageTitle: 'worship',
    title: 'Worship',
    description: 'We believe in one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.',
  },
];

class Ministries extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    // Mongo data not currently used - left for future use.
    // eslint-disable-next-line no-unused-vars
    const ministryList = this.props.data.map(ministryObj => ministryObj.name);

    return (
      <div id={styles.ministries}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Ministries.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/ministries/ministries.jpg">
          Ministries
        </TitleBanner>

        <div className={styles.pageContent}>
          <TileDeck
            data={ministriesList}
          />
        </div>
      </div>
    );
  }
}

// Data not pulled through redux store/Mongo right now, just using static data. Potential use in future.
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
