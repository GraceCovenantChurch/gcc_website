import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';
import contentfulClient from '../modules/contentful';

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
            src={this.props.image}
          />
          <div className={styles.staffInfoContainer}>
            <div className={styles.staffName}>{this.props.name}</div>
            <div className={styles.staffTitle}>{this.props.title}</div>
            <div className={`${this.props.open ? styles.staffBiographyOpen : styles.staffBiography}`}>
              {this.props.biography}
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
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  biography: PropTypes.string.isRequired,
};

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffList: [],
      openIndex: -1,
    };
    this.openStaff = this.openStaff.bind(this);
  }

  componentDidMount() {
    contentfulClient.getEntries({
      content_type: 'staff',
    }).then((entries) => {
      const staffList = entries.items.map(item => ({
        name: item.fields.name,
        title: item.fields.title,
        biography: item.fields.biography,
        image: item.fields.image.fields.file.url,
      }));

      this.setState({
        staffList,
      });
    });
  }

  componentDidUpdate() {
    const selectedStaff = document.querySelector(`.${styles.first}`);
    if (selectedStaff) {
      selectedStaff.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  openStaff(index) {
    this.setState({
      openIndex: index,
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
          {this.state.staffList.map((staffObj, index) => (
            <StaffBox
              key={staffObj.name}
              onClick={this.openStaff}
              index={index}
              open={this.state.openIndex === index}
              name={staffObj.name}
              title={staffObj.title}
              image={staffObj.image}
              biography={staffObj.biography}
            />
          ))}
        </div>
      </div>
    );
  }
}

const StaffPage = withTitle('Staff')(Staff);

export default StaffPage;
