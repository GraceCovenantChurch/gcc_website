import React from 'react';

import Center from './Center';

import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Center vertical horizontal>
      <div className={styles.footerBorder}>
        <div className={`${styles.footerContainer} container footer`}>
          <div className={styles.copyright}>
            <p>Copyright &copy; 1996-2018. Official website of <a href="/">Grace Covenant Church</a> in Philadelphia, PA. All rights reserved.</p>
          </div>
          <div className={styles.icons}>
            <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://www.facebook.com/gracecovenant/"><i className="fa fa-facebook fa-2x" /></a>
            <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://www.instagram.com/gccphiladelphia/"><i className="fa fa-instagram fa-2x" /></a>
            <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://twitter.com/gccphiladelphia"><i className="fa fa-twitter fa-2x" /></a>
          </div>
        </div>
      </div>
    </Center>
  </footer>
);

export default Footer;
