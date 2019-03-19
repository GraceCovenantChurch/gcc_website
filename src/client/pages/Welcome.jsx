import nconf from 'nconf';
import React from 'react';
import Helmet from 'react-helmet';

import withTitle from '../hoc/withTitle';
import Center from '../components/Center';
import TitleBanner from '../components/TitleBanner';
import AspectRatio from '../components/AspectRatio';

import styles from './Welcome.css';

const Welcome = () => (
  <div>
    <Helmet>
      <link rel="stylesheet" type="text/css" href="public/assets/pages/welcome/Welcome.bundle.css" />
    </Helmet>

    <TitleBanner src="/static/images/welcome/welcome_background.jpg">
      <Center horizontal vertical>
        Welcome
      </Center>
    </TitleBanner>

    <div className={styles.pageContent}>
      <div className={styles.description}>
        {'Welcome to '} <a className={styles.link} href="/">Grace Covenant Church (GCC)</a>{'! During your time with us, we hope you’ll be able to catch a glimpse of how God is faithfully moving in Philadelphia.'}
      </div>

      <div className={styles.media}>
        <iframe width="100%" height="100%" title="Grace Covenant Church Intro Video" src="https://www.youtube.com/embed/L8pMq-z8U80" frameBorder="0" allowFullScreen="true" />
      </div>

      <div className={styles.description}>
        {'Our doors are wide open to people from all backgrounds. Whether you are a spiritual seeker who’s just beginning to ask questions about God or a committed Christian who wants to deepen one’s faith, GCC is a welcoming community that you can call family and find spiritual help, hope, and encouragement from. We invite you to discover God’s wonderful love and plan for your life through our church!'}
      </div>

      <div className={styles.description}>
        <h4 className={styles.header}>What makes us unique?</h4>
        {'It isn’t our '}<a className={styles.link} href="/beliefs">beliefs</a>{'. We affirm the same basic Christian doctrines that have been a part of the Church for hundreds of years. Rather, we are committed to presenting these truths in a practical, relevant, contemporary, and loving manner. Our desire is to introduce you to Jesus Christ and to help you grow and become a kingdom worker.'}
      </div>

      <div className={styles.description}>
        <h4 className={styles.header}>How can you get involved?</h4>
        {'Our church is comprised of a network of '}<a className={styles.link} href="/familygroup">family groups</a>{': small, intimate groups in which honest friendships, Bible study, prayer, and compassionate care for one another are emphasized. Our family groups are where the core of our evangelism and discipleship takes place. We invite you to join one and be able to call GCC your home!'}
        <br /> <br />
        {'Our Sunday service is typically located at Meyerson Hall, Room B1 (210 South 34th Street).'}
      </div>

      <div className={styles.maps}>
        <AspectRatio ratio={4 / 3}>
          <iframe frameBorder="0" title="Meyerson Hall" src={`https://www.google.com/maps/embed/v1/place?q=Meyerson+Hall,+Philadelphia,+PA,+United+States&key=${nconf.get('GOOGLE_MAPS_KEY')}`} style={{ width: '100%', height: '100%' }} />
        </AspectRatio>
      </div>

      <div className={styles.description}>
        {'If you would like more information about GCC, please continue to explore this website or feel free contact us at '}
        <a className={styles.link} href="mailto:web@gracecovenant.net">web@gracecovenant.net</a>
        {'. Stay connected through our '}
        <a className={styles.link} href="https://www.facebook.com/gracecovenant/">Facebook</a>
        {' and '}
        <a className={styles.link} href="https://www.instagram.com/gccphiladelphia/">Instagram</a>
        {', too!'}
        <br /> <br />
        {'Thanks for visiting! May God’s grace and peace be with you.'}
      </div>

    </div>
  </div>
);

const WelcomePage = withTitle('Welcome')(Welcome);

export default WelcomePage;
