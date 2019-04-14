import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';

import NavbarDropdown from '../components/NavbarDropdown';
import Head from '../components/Head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './MainTemplate.css';
import navStyles from '../components/Navbar.css';

const MainTemplate = ({ route }) => (
  <div>
    <Head />
    <Navbar
      brand={
        <Link to="/">
          <h1 className="sr-only">Grace Covenant Church</h1>
          <img className={`${navStyles['logo-light']}`} src="/static/images/gcclogo.png" alt="Grace Covenant Church" />
          <img className={`${navStyles['logo-dark']}`} src="/static/images/gcclogo-black.png" alt="Grace Covenant Church" />
        </Link>
      }
      links={[
        <NavbarDropdown
          text="About">
          <Link to="/welcome">Welcome</Link>
          <Link to="/beliefs">Beliefs</Link>
          <Link to="/staff">Staff</Link>
          <a href="http://ml.gracecovenant.net/" target="_blank" rel="noopener noreferrer">Mainline Site</a>
          <a href="http://amichurches.com/" target="_blank" rel="noopener noreferrer">AMI</a>
        </NavbarDropdown>,
        <span className={navStyles.aboutLink}><Link to="/welcome">Welcome</Link></span>,
        <span className={navStyles.aboutLink}><Link to="/beliefs">Beliefs</Link></span>,
        <span className={navStyles.aboutLink}><Link to="/staff">Staff</Link></span>,
        <span className={navStyles.aboutLink}><a href="http://ml.gracecovenant.net/" target="_blank" rel="noopener noreferrer">Mainline Site</a></span>,
        <span className={navStyles.aboutLink}><a href="http://amichurches.com/" target="_blank" rel="noopener noreferrer">AMI</a></span>,
        <Link to="/familygroup">Family Groups</Link>,
        <Link to="/ministries">Ministries</Link>,
        <Link to="/giving">Giving</Link>,
        <Link to="/multimedia">Multimedia</Link>,
        <Link to="/events">Events</Link>,
      ]}
      className={`navbar-light ${navStyles['navbar-light']}`}
    />
    <main>{renderRoutes(route.routes)}</main>
    <Footer />
  </div>
);

MainTemplate.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array,
  }).isRequired,
};

export default MainTemplate;
