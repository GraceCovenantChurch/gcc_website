import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Center from './Center';
import Jumbotron from './Jumbotron';
import BackgroundImage from './BackgroundImage';

import customStyles from './BannerBibleVerse.css';

class BannerBibleVerse extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <Jumbotron className="bibleVerse" style={{ height: '100vh' }}>
        <BackgroundImage
          src={this.props.image}
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="fixed"
        />
        <Center horizontal vertical>
          <div
            className={customStyles.bibleVerse}
            style={{ color: 'black' }}
          >
            <h1>{this.props.month}</h1>
            <h3>{this.props.verse}</h3>
            <h4>{this.props.reference}</h4>
          </div>
        </Center>
      </Jumbotron>
    );
  }
}

BannerBibleVerse.propTypes = {
  fetchData: PropTypes.func.isRequired,
  month: PropTypes.string,
  verse: PropTypes.string,
  reference: PropTypes.string,
  image: PropTypes.string,
};

BannerBibleVerse.defaultProps = {
  month: '',
  verse: '',
  reference: '',
  image: '',
};

const withData = connect(() => {
  // TODO: get data from state
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return {
    month: months[(new Date()).getMonth()],
    verse: 'Whom have I in heaven but you? And there is nothing on earth that I desire besides you. My flesh and my heart may fail, but God is the strength of my heart and my portion forever.',
    reference: 'Psalm 73:25-26',
    image: null,
  };
}, () => (
  {
    fetchData() {
      // TODO: fetch monthly bible verse
    },
  }
));

export default withData(BannerBibleVerse);
