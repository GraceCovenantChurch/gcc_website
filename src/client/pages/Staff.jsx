import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';

import styles from './Staff.css';


class StaffBox extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <div
        className={`${styles.staffRow} ${styles[this.props.open ? 'first' : '']}`}
        onClick={this.onClick}
      >
        <div className={styles.staffBox}>
          <img
            alt="staff"
            className={`${this.props.open ? styles.staffImageOpen : styles.staffImage}`}
            src={this.props.imageURL}
          />
          <div className={styles.staffInfoContainer}>
            <div className={styles.staffName}>{this.props.name}</div>
            <div className={styles.staffTitle}>{this.props.title}</div>
            <div className={`${this.props.open ? styles.staffDescriptionOpen : styles.staffDescription}`}>
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
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
};

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openIndex: -1,
    };
    this.openStaff = this.openStaff.bind(this);
  }

  componentDidUpdate() {
    document
      .querySelector(`.${styles.first}`)
      .scrollIntoView({
        behavior: 'smooth',
      });
  }

  openStaff(index) {
    this.setState({
      openIndex: index,
    });
  }

  render() {
    const staffList = [
      {
        name: 'Pastor Young Kim',
        title: 'Senior Pastor',
        imageURL: '/static/images/staff/youngkim.png',
        description: `After receiving his initial calling into ministry as
         a Bio-Engineer at the University of Illinois at Champaign-Urbana,
         he finished his Master of Divinity at Biblical Theological Seminary (1989-1992).
         He also finished his Masters in Urban Missions at Westminster Theological Seminary (1995-1996). 
         In 1996, he planted Grace Covenant Church with a vision to be a multi-ethnic church that will 
         raise kingdom workers for the harvest of the world to the glory of God. God has blessed Pastor 
         Young and his wife Annette with His precious gifts in Sarah, Daniel, and Isaiah. “My prayer is 
         that the Holy Spirit may empower me to love Jesus with all my heart, mind, strength and soul 
         and to love others with the love of God.”`,
      },
      {
        name: 'Pastor Kirt Thallman',
        title: 'University City Site Pastor',
        imageURL: '/static/images/staff/kirtthallman.png',
        description: `Pastor Kirt received his Master of Divinity from Asbury Theological Seminary
         and graduated from the University of Akron with a degree in electronics. Originally from Ohio, 
         he became the pastor of House of Praise Bilingual Church in Taipei, Taiwan from 2000-2007. 
         There he met his wife, Mei Lan. Before coming to GCC, he was a pastor of the English Ministry at 
         the Chinese Christian Church of Columbia, South Carolina from 2008-2011. He loves worshipping the 
         “True King Jesus” and being a husband to his wife and dad to his two children, Nathan and Naomi. 
         In his free time you will find him playing basketball and fixing unwanted things – “making the old 
         new again.” Some themes that reflect his heart are: “love God, love others”, “give & receive grace”, 
         “be real & be healed”, “be interdependent not independent” and “my identity is in Christ”.`,
      },
      {
        name: 'Chris Chen',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/chrischen.jpg',
        description: `Chris was born in Queens, New York and grew up in the suburbs of Los Angeles. 
        At 19 he enlisted in the US Army where he was a paratrooper for the special operations community. 
        After 4 years of active duty service and 3 tours to Iraq he left to join a private defense company. 
        He worked in Virginia for the next 2 years and deployed to Afghanistan once. Chris joined GCC in 2012 
        while he was studying at the University of Pennsylvania where he graduated with a Bachelor of Arts in 
          Religious Studies. Chris is currently pursuing his Master of Divinity at Cairn University. Chris 
        loves to try new things and see new sights. He has a heart to see people come to Christ and to develop 
        deep intimacy with the Father. Following Christ has been the best and most exciting ride in Chris’ life!`,
      },
      {
        name: 'Bryan Mun',
        title: 'University City College Staff',
        imageURL: '/static/images/staff/bryanmun.png',
        description: `Bryan was born and raised in the Bay Area, California. 
        He attended the University of California Davis for his undergraduate studies to pursue 
        a degree in Mechanical Engineering. It was during his sophomore year that he received his calling 
        into ministry. In spring of 2017, he received his M. Div from Gordon-Conwell Theological Seminary. 
        Bryan enjoys drinking good coffee, playing sports, and spending time with his family and friends. 
        His heart is that all people would come to know the amazing love of Jesus and be continually 
        transformed by the Gospel.`,
      },
      {
        name: 'Josh Kwon',
        title: 'Mainline College and Young Adult Staff',
        imageURL: '/static/images/staff/joshkwon.jpg',
        description: `Josh spent most of his early life in Southern California in the suburbs of Orange County. 
        He graduated from UCLA with a major in Political Science. For almost a decade after graduating college, 
        Josh worked in the greater Los Angeles area as a real estate advisor. Before coming to Grace Covenant 
        Church (GCC), Josh served at Radiance Christian Church (a fellow AMI church) in San Francisco as a deacon. 
        Through the messages and relationships developed at RCC, God’s mandate in making disciples became clear, 
        vivid, and personal. Responding to the call to ministry, Josh moved to Philadelphia in 2015, and is 
        currently pursuing his Master of Divinity at Westminster Theological Seminary with an 
        emphasis on pastoral ministry.`,
      },
      {
        name: 'Bekah Lee',
        title: 'Mainline Children\'s Pastor',
        imageURL: '/static/images/staff/bekahlee.png',
        description: `Rebekah was born and raised in the suburbs of northern New Jersey. She studied 
        Psychology at Rutgers University, and after graduating, she worked as a preschool teacher 
        for a Christian school. She felt God leading her to attend seminary, and she received a 
          Master of Divinity from Gordon-Conwell Theological Seminary. Rebekah loves children and 
        discovered a heart to raise up children and youth in her college years. She is passionate 
        about the development and formation of faith in people, and hopes to encourage them in their 
        gifts and calling, as they follow God and build up His church. She enjoys painting, writing, 
        and spending time with family and friends.`,
      },
      {
        name: 'Chris Kwon',
        title: 'University City Worship Leader',
        imageURL: '/static/images/staff/chriskwon.jpg',
        description: `Chris was born and raised in the city of Philadelphia, graduating from 
        the University of Pennsylvania with a degree in Economics. He has worked in the financial 
        planning business since graduating from Penn in 2008. Chris began attending GCC as a freshman 
        at Penn in the fall of 2004, and had his life turned upside down through many years of 
        encountering Jesus during his undergraduate and young adult years. It was at GCC where 
        he met his wife, Ellen, who also had her life transformed while encountering Jesus at GCC.

        Chris has been part of the GCC Worship Team for many years, and is passionate about engaging 
        others in honest worship of the one true King, Jesus Christ. He is also a lifetime fan of 
        Philadelphia sports, no matter how bad the teams are. You will often find Chris getting worked 
        up in discussions about sports, the economy, or the bible – he is always welcoming of a good chat! 
        Most of all, Chris loves to share with others about the work of God in his life and to hear about 
        the work of God in others.`,
      },
    ];

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
              onClick={this.openStaff}
              index={index}
              open={this.state.openIndex === index}
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
