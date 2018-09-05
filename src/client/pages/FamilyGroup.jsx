import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';

import styles from './FamilyGroup.css';

const FamilyGroupRow = props => (
  <div className={styles.tableRow}>
    <div className={styles.column}>
      <img className={styles.tableMedia} src={props.src} alt="fg-row-media" />
    </div>
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <div className={styles.rowTitle}>
          {props.title}
        </div>
        <div className={styles.rowDays}>
          {props.days}
        </div>
        <div className={styles.rowDescription}>
          {props.description}
        </div>
        <div className={styles.rowSignup}>
          <a href={props.signupLink}>You can sign up here &gt;</a>
        </div>
      </div>
    </div>
  </div>
);

FamilyGroupRow.propTypes = {
  title: PropTypes.string.isRequired,
  days: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  signupLink: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

const FamilyGroup = () => (
  <div>
    <Helmet>
      <link rel="stylesheet" type="text/css" href="/public/assets/pages/FamilyGroup.bundle.css" />
    </Helmet>

    <TitleBanner src="/static/images/familygroup/fg_background.jpg">
      Family Group
    </TitleBanner>

    <div className={styles.pageContent}>
      <div className={styles.description}>
        {'At GCC we place a high emphasis on Family Groups because we believe that it is in these smaller settings that we are able to meet with God, building meaningful relationships, and develop biblical accountability. Family groups meet on a weekly basis at various places.'}
      </div>

      <iframe
        className={styles.media}
        src="https://www.youtube.com/embed/rvXubANV7RA"
        frameBorder="0"
        title="intro"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      <div className={styles.description}>
        {'Through Bible study, discussions, sharing, prayer, and hangouts, we learn together to live out the teachings of God’s Word in our daily lives. Family groups meet on a weekly basis at various locations. Join us!'}
      </div>


      <div className={styles.signupTable}>
        <FamilyGroupRow
          src="/static/images/familygroup/fg_college.jpg"
          title="College Ministry: Harvest"
          days="Mondays to Thursdays"
          description="Our college family groups meet once a week at Drexel University, the University of Pennsylvania, Temple University, Moore College of Art & Design, and the University of the Sciences."
          signupLink="#"
        />

        <FamilyGroupRow
          title="Young Adult: Crossroads"
          src="/static/images/familygroup/fg_ya.jpg"
          days="Mondays to Thursdays"
          description="Our young adult family groups meet once a week and have a mix of post-undergraduates, graduate students, working adults, and young married couples. Crossroads at our University City site exists to serve, love on, and walk with those who are in times of transition and constant change."
          signupLink="#"
        />
      </div>
    </div>
  </div>
);

const FamilyGroupPage = withTitle('Family Group')(FamilyGroup);

export default FamilyGroupPage;
