import React from 'react';
import Center from './Center';
import styles from './Footer.css';

const Footer = () => (
  <footer>
    <Center vertical horizontal>
      <div className="container footer">
        <div className={styles.icons}>
          <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://www.facebook.com/gracecovenant/"><i className="fa fa-facebook fa-2x" /></a>
          <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://twitter.com/gccphiladelphia"><i className="fa fa-twitter fa-2x" /></a>
          <a target="_blank" rel="noopener noreferrer" className={styles.footerLinks} href="https://www.instagram.com/gccphiladelphia/"><i className="fa fa-instagram fa-2x" /></a>
        </div>
        <p>&copy; Grace Covenant Church</p>
      </div>
    </Center>
  </footer>
);

export default Footer;
