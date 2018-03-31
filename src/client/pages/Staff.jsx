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
      <div className={styles.staffRow}>
        <div className={`${styles.staffBox} ${styles["box" + this.props.index]}`}>
          <img className={styles.staffImage} src={this.props.imageURL}></img>
          <div className={styles.staffContainer}>
            <div className={styles.staffName}>{this.props.name}</div>
            <div className={styles.staffTitle}>{this.props.title}</div>
            <div className={`${styles.staffDescription} ${styles["desc1"]}`}>
              {this.props.description}
            </div>
          </div>
        </div>
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
        description: 'After receiving his initial calling into ministry as a Bio-Engineer at the University of Illinois at Champaign-Urbana, he finished his Master of Divinity at Biblical Theological Seminary (1989-1992). He also finished his Masters in Urban Missions at Westminster Theological Seminary (1995-1996). In 1996, he planted Grace Covenant Church with a vision to be a multi-ethnic church that will raise kingdom workers for the harvest of the world to the glory of God. God has blessed Pastor Young and his wife Annette with His precious gifts in Sarah, Daniel, and Isaiah. “My prayer is that the Holy Spirit may empower me to love Jesus with all my heart, mind, strength and soul and to love others with the love of God.”'
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

        <TitleBanner src="/static/images/staff/staff.jpg">
          Staff
        </TitleBanner>

        <div className={styles.pageContent}>
          {staffList.map((staffObj, index) => (
                <StaffBox
                index={index}
                name={staffObj.name}
                title={staffObj.title}
                imageURL={staffObj.imageURL}
                description={staffObj.description}
                />
          ))}      
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
