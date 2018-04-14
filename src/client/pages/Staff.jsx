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
      <div className={`${styles.staffBox} ${styles["box" + this.props.index]}`}>
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
        imageURL: '/static/images/staff/youngkim.png',
        description: 'I\'m Pastor Young!!!!'
      },
      {
        name: 'Pastor Kirt Thallman',
        title: 'University City Site Pastor',
        imageURL: '/static/images/staff/kirtthallman.png',
        description: 'I\'m Pastor Kirt!!!!'
      },
      {
        name: 'Chris Chen',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/chrischen.jpg',
        description: 'I\'m Pastor Chris!!!!'
      },
      {
        name: 'Bryan Mun',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/bryanmun.png',
        description: 'I\'m Pastor Bryan!!!!'
      },
      {
        name: 'Josh Kwon',
        title: 'Mainline College and Young Adult Staff',
        imageURL: '/static/images/staff/joshkwon.jpg',
        description: 'I\'m Pastor Josh!!!!'
      },
      {
        name: 'Bekah Lee',
        title: 'Mainline Children\'s Pastor',
        imageURL: '/static/images/staff/bekahlee.png',
        description: 'I\'m Pastor Bekah!!!!'
      },
      {
        name: 'Chris Kwon',
        title: 'University City Worship Leader',
        imageURL: '/static/images/staff/chriskwon.jpg',
        description: 'I\'m Chris Kwon!!!!'
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
          {staffList.map((staffObj, index) => (
              <StaffBox
              index={index}
              name={staffObj.name}
              title={staffObj.title}
              imageURL={staffObj.imageURL}
              />
          ))}
          {staffList.map((staffObj, index) => (
              <div className={`${styles.staffDescription} ${styles["desc1"]}`}>
                {staffObj.description}
              </div>
          ))}         
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
