import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import Center from '../components/Center';

import styles from './Staff.css';


class StaffBox extends Component {
  render(){
    return(
      <div className={styles.staffBox}>
        <img className={styles.staffImage} src={this.props.imageURL}></img>
        <div className={styles.staffName}>{this.props.name}</div>
        <div className={styles.staffTitle}>{this.props.title}</div>
      </div>
    );
  }
}

StaffBox.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};

class Staff extends Component {
  
  render() {
    const staffList = [
      {
        name: 'Pastor Young Kim',
        title: 'Senior Pastor',
        imageURL: '/static/images/staff/youngkim.png'
      },
      {
        name: 'Pastor Kirt Thallman',
        title: 'University City Site Pastor',
        imageURL: '/static/images/staff/kirtthallman.png'
      },
      {
        name: 'Chris Chen',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/chrischen.jpg'
      },
      {
        name: 'Bryan Mun',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/bryanmun.png'
      },
      {
        name: 'Josh Kwon',
        title: 'Mainline College and Young Adult Staff',
        imageURL: '/static/images/staff/joshkwon.jpg'
      },
      {
        name: 'Bekah Lee',
        title: 'Mainline Children\'s Pastor',
        imageURL: '/static/images/staff/bekahlee.png'
      },
      {
        name: 'Chris Kwon',
        title: 'University City Worship Leader',
        imageURL: '/static/images/staff/chriskwon.jpg'
      }
    ]

    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Staff.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/staff/staff_background.jpg">
          Staff
        </TitleBanner>

        <div className={styles.pageContent}>
          {staffList.map(staffObj => (
            <StaffBox
            name={staffObj.name}
            title={staffObj.title}
            imageURL={staffObj.imageURL}
            />
          ))}
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
